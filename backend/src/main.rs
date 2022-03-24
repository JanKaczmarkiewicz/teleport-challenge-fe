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
