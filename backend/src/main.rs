#[macro_use]
extern crate rocket;

use backend::{get_folder, Directory, File, Location};
use rocket::{
    http::Status,
    routes,
    serde::{json::Json, Serialize},
};
use std::path::PathBuf;

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

impl FolderResponse {
    fn from(Directory { name, items }: &Directory) -> Self {
        let items: Vec<_> = items
            .iter()
            .map(|item| match item {
                &Location::Directory(Directory { name, items: _ }) => FolderItem {
                    name,
                    size_kb: 0,
                    r#type: "dir",
                },
                &Location::File(File { name, size_kb }) => FolderItem {
                    r#type: "file",
                    name,
                    size_kb,
                },
            })
            .collect();

        Self { name, items }
    }
}

#[get("/folder/<path..>")]
fn folder(path: PathBuf) -> Result<Json<FolderResponse>, Status> {
    let path_steps: Vec<&str> = path.to_str().unwrap().split("/").collect();

    let found_folder = get_folder(path_steps);

    if let Some(folder) = found_folder {
        Ok(Json(FolderResponse::from(folder)))
    } else {
        Err(Status::NotFound)
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![folder])
}
