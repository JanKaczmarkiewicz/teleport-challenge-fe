use crate::{
    auth::Auth,
    db::folder::{get_folder, DirectoryData},
};
use rocket::{get, http::Status, serde::json::Json};
use std::path::PathBuf;

#[get("/<path..>")]
pub fn folder_data(path: PathBuf, _auth: Auth) -> Result<Json<DirectoryData>, Status> {
    let found_folder = get_folder(path);

    if let Some(folder) = found_folder {
        Ok(Json(folder))
    } else {
        Err(Status::NotFound)
    }
}
