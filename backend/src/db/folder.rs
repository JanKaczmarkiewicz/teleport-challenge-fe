use std::{fs, path::PathBuf};

pub struct File {
    pub size_kb: f64,
    pub name: String,
}

pub struct Directory {
    pub name: String,
}

pub enum Location {
    Directory(Directory),
    File(File),
}

pub struct DirectoryData {
    pub name: String,
    pub items: Vec<Location>,
}

pub fn get_folder(relative_path: PathBuf) -> Option<DirectoryData> {
    let mut path = PathBuf::from("./root");
    let relative_path = relative_path.to_str()?.to_owned().replace(".", "");
    path.push(relative_path);

    let name = path.file_name()?.to_str()?.to_owned();
    let directory = fs::read_dir(path).ok()?;

    let items = directory
        .flatten()
        .flat_map(|file| -> Option<Location> {
            let name = file.file_name().to_str()?.to_owned();
            let metadata = file.metadata().ok()?;

            if metadata.is_dir() {
                Some(Location::Directory(Directory { name }))
            } else {
                let size_kb = metadata.len() as f64 / 1000 as f64;
                Some(Location::File(File { name, size_kb }))
            }
        })
        .collect::<Vec<_>>();

    Some(DirectoryData { name, items })
}
