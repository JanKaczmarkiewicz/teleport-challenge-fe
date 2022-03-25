use crate::{
    auth::Auth,
    db::folder::{get_folder, Directory, DirectoryData, File, Location},
};
use ::serde::Serialize;
use rocket::{get, http::Status, serde::json::Json};
use serde::Deserialize;
use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FolderItem {
    pub size_kb: f64,
    pub name: String,
    pub r#type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FolderResponse {
    pub name: String,
    pub items: Vec<FolderItem>,
}

impl FolderResponse {
    fn from(DirectoryData { name, items }: DirectoryData) -> Self {
        let items: Vec<_> = items
            .into_iter()
            .map(|item| match item {
                Location::Directory(Directory { name }) => FolderItem {
                    name,
                    size_kb: 0.0,
                    r#type: String::from("dir"),
                },
                Location::File(File { name, size_kb }) => FolderItem {
                    r#type: String::from("file"),
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
    let found_folder = get_folder(path);

    if let Some(folder) = found_folder {
        Ok(Json(FolderResponse::from(folder)))
    } else {
        Err(Status::NotFound)
    }
}
