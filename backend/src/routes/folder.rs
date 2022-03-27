use crate::{
    auth::Auth,
    db::folder::{get_folder, DirectoryData},
};
use rocket::{get, http::Status, serde::json::Json};
use std::path::PathBuf;

// SAFETY: https://github.dev/SergioBenitez/Rocket/blob/e382bc584b478092fdd53eefb9f90ea9c08a6967/core/lib/src/request/from_param.rs#L319-L320
#[get("/<path..>")]
pub fn folder_data(path: PathBuf, _auth: Auth) -> Result<Json<DirectoryData>, Status> {
    let found_folder = get_folder(path);

    if let Some(folder) = found_folder {
        Ok(Json(folder))
    } else {
        Err(Status::NotFound)
    }
}
