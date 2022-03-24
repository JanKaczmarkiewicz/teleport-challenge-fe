use rocket::options;
use std::path::PathBuf;

#[options("/<_path..>")]
pub fn cors(_path: PathBuf) {}
