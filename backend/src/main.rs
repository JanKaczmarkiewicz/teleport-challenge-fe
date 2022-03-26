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
    use backend::db::folder::DirectoryData;
    use rocket::{
        http::{ContentType, SameSite, Status},
        local::blocking::Client,
    };

    const VALID_USER_CREDENTIALS: &'static str =
        r#"{ "username": "Patricia12", "password": "weirdcloud46" }"#;

    const INVALID_USER_CREDENTIALS: &'static str =
        r#"{ "username": "Patricia12", "password": "badpassword" }"#;

    #[test]
    fn folder_negative_unauthorized() {
        let rocket = rocket();
        let client = Client::tracked(rocket).unwrap();
        let response = client.get("/folder").dispatch();
        assert_eq!(response.status(), Status::Unauthorized);
    }

    #[test]
    fn login_negative() {
        let rocket = rocket();
        let client = Client::tracked(rocket).unwrap();
        let response = client
            .post("/session")
            .header(ContentType::JSON)
            .body(INVALID_USER_CREDENTIALS)
            .dispatch();

        assert_eq!(response.status(), Status::Unauthorized);
    }

    #[test]
    fn login_positive() {
        let rocket = rocket();
        let client = Client::tracked(rocket).unwrap();

        let login_response = client
            .post("/session")
            .header(ContentType::JSON)
            .body(VALID_USER_CREDENTIALS)
            .dispatch();

        let cookies = login_response.cookies();
        let token_cookie = cookies.get_private("token").unwrap();

        assert_eq!(login_response.status(), Status::Ok);
        assert_eq!(token_cookie.http_only().unwrap(), true);
        assert_eq!(token_cookie.secure().unwrap(), true);
        assert_eq!(token_cookie.same_site().unwrap(), SameSite::None);
        assert_eq!(token_cookie.value(), "1");
    }

    #[test]
    fn folder_positive_out_of_root() {
        let rocket = rocket();
        let client = Client::tracked(rocket).unwrap();

        client
            .post("/session")
            .header(ContentType::JSON)
            .body(VALID_USER_CREDENTIALS)
            .dispatch();

        let response = client.get("/folder/..").dispatch();

        assert_eq!(response.status(), Status::Ok);

        let json: DirectoryData = serde_json::from_str(&response.into_string().unwrap()).unwrap();
        assert_eq!(json.name, "root");
    }

    #[test]
    fn folder_positive() {
        let rocket = rocket();
        let client = Client::tracked(rocket).unwrap();
        client
            .post("/session")
            .header(ContentType::JSON)
            .body(VALID_USER_CREDENTIALS)
            .dispatch();

        let response = client.get("/folder").dispatch();

        assert_eq!(response.status(), Status::Ok);
    }
}
