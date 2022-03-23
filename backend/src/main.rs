#[macro_use]
extern crate rocket;

use rocket::{
    http::Status,
    routes,
    serde::{json::Json, Serialize},
};

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct FolderItem {
    size_kb: u32,
    name: &'static str,
    r#type: &'static str,
}

#[derive(Debug, Serialize)]
struct FolderResponse {
    name: &'static str,
    items: Vec<FolderItem>,
}

#[get("/folder")]
fn folder() -> Result<Json<FolderResponse>, Status> {
    Ok(Json(FolderResponse {
        items: vec![],
        name: "root",
    }))
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![folder])
}
