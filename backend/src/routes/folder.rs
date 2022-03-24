use crate::{
    auth::Auth,
    db::folder::{get_folder, Directory, File, Location},
};
use ::serde::Serialize;
use rocket::{get, http::Status, serde::json::Json};
use std::path::PathBuf;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct FolderItem {
    size_kb: u32,
    name: &'static str,
    r#type: &'static str,
}

#[derive(Debug, Serialize)]
pub struct FolderResponse {
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

#[get("/<path..>")]
pub fn folder_data(path: PathBuf, _auth: Auth) -> Result<Json<FolderResponse>, Status> {
    let path: Vec<&str> = path.to_str().unwrap().split("/").collect();
    let found_folder = get_folder(path);

    if let Some(folder) = found_folder {
        Ok(Json(FolderResponse::from(folder)))
    } else {
        Err(Status::NotFound)
    }
}
