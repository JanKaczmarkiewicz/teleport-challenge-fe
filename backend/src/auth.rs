use rocket::http::Status;
use rocket::outcome::IntoOutcome;
use rocket::request::{FromRequest, Outcome, Request};

use crate::db::user::get_user_by_id;

pub struct Auth<'a>(&'a str);

pub const TOKEN: &'static str = "token";

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Auth<'r> {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        request
            .cookies()
            .get_private(TOKEN)
            .and_then(|cookie| get_user_by_id(cookie.value()))
            .and_then(|user| Some(Auth(user.id)))
            .into_outcome(((Status::Unauthorized), ()))
    }
}
