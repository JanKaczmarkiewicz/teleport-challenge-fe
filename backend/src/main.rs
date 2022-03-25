#[macro_use]
extern crate rocket;

use backend::{
    cors::CORS,
    routes::{folder, global, session},
};
use rocket::routes;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(CORS)
        .mount("/", routes![global::cors])
        .mount("/folder", routes![folder::folder_data])
        .mount(
            "/session",
            routes![session::login, session::logout, session::is_logged,],
        )
}

#[cfg(test)]
mod test {
    use super::rocket;
    use rocket::{
        http::{ContentType, Status},
        local::blocking::Client,
    };

    #[test]
    fn unauthenticated_user_cannot_access_folder_data() {
        let rocket = rocket();
        let client = Client::tracked(rocket).unwrap();
        let response = client.get("/folder").dispatch();
        assert_eq!(response.status(), Status::Unauthorized);
    }

    #[test]
    fn authenticated_user_can_access_folder_data() {
        let rocket = rocket();
        let client = Client::tracked(rocket).unwrap();
        let login_response = client
            .post("/session")
            .header(ContentType::JSON)
            .body(r#"{ "username": "Patricia12", "password": "weirdcloud46" }"#)
            .dispatch();

        let cookies = login_response.cookies();
        let token_cookie = cookies.get_private("token").unwrap();

        assert_eq!(login_response.status(), Status::Ok);
        assert_eq!(token_cookie.http_only().unwrap(), true);
        assert_eq!(token_cookie.secure().unwrap(), true);
        assert_eq!(token_cookie.value(), "1");

        let response = client.get("/folder").dispatch();

        assert_eq!(response.status(), Status::Ok);
    }
}
