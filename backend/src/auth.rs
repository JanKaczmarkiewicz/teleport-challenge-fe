use crate::db::user::get_user_by_id;
use rocket::http::Status;
use rocket::outcome::IntoOutcome;
use rocket::request::{FromRequest, Outcome, Request};

pub struct Auth<'a>(&'a str);

pub const TOKEN: &str = "token";

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Auth<'r> {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        request
            .cookies()
            .get_private(TOKEN)
            .and_then(|cookie| get_user_by_id(cookie.value()))
            .map(|user| Auth(user.id))
            .into_outcome(((Status::Unauthorized), ()))
    }
}
