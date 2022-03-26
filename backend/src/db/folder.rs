use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FolderItem {
    pub size_kb: f64,
    pub name: String,
    pub r#type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DirectoryData {
    pub name: String,
    pub items: Vec<FolderItem>,
}

pub fn get_folder(relative_path: PathBuf) -> Option<DirectoryData> {
    let mut path = PathBuf::from("./root");
    let relative_path = relative_path.to_str()?.to_owned();
    path.push(relative_path);

    let name = path.file_name()?.to_str()?.to_owned();

    let items = fs::read_dir(path)
        .ok()?
        .flatten()
        .flat_map(|file| {
            let name = file.file_name().to_str()?.to_owned();
            let metadata = file.metadata().ok()?;

            if metadata.is_dir() {
                Some(FolderItem {
                    name,
                    r#type: String::from("dir"),
                    size_kb: 0.0,
                })
            } else {
                let size_kb = metadata.len() as f64 / 1000 as f64;

                Some(FolderItem {
                    name,
                    r#type: String::from("file"),
                    size_kb,
                })
            }
        })
        .collect::<Vec<_>>();

    Some(DirectoryData { name, items })
}
