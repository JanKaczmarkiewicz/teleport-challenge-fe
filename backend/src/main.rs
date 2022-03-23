use rocket::routes;

#[macro_use]
extern crate rocket;

#[get("/")]
fn folder() -> &'static str {
    "Hello world"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![folder])
}
