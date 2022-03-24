use rocket::{
    delete, get,
    http::{Cookie, CookieJar, Status},
    post,
    serde::json::Json,
};
use serde::Deserialize;

use crate::{auth::TOKEN, db::user::get_user_by_credentials};

#[derive(Deserialize, Debug)]
pub struct Credentials<'a> {
    username: &'a str,
    password: &'a str,
}

#[post("/", format = "json", data = "<credentials>")]
pub fn login(cookies: &CookieJar<'_>, credentials: Json<Credentials<'_>>) -> Result<(), Status> {
    if let Some(user) = get_user_by_credentials(credentials.username, credentials.password) {
        let cookie = Cookie::build(TOKEN, user.id).http_only(true).finish();

        cookies.add_private(cookie);
        return Ok(());
    }

    Err(Status::BadRequest)
}

#[get("/")]
pub fn is_logged(cookies: &CookieJar<'_>) -> Json<bool> {
    Json(cookies.get(TOKEN).is_some())
}

#[delete("/")]
pub fn logout(cookies: &CookieJar<'_>) {
    cookies.remove_private(Cookie::named(TOKEN));
}
