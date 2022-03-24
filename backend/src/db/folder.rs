pub struct File {
    pub size_kb: u32,
    pub name: &'static str,
}

pub enum Location {
    Directory(Directory),
    File(File),
}

pub struct Directory {
    pub name: &'static str,
    pub items: &'static [Location],
}

const ROOT_DIRECTORY: Directory = Directory {
    name: "teleport",
    items: &[
        Location::Directory(Directory {
            name: "lib",
            items: &[
                Location::File(File {
                    name: "teleport.go",
                    size_kb: 320,
                }),
                Location::File(File {
                    name: "test.go",
                    size_kb: 3320,
                }),
            ],
        }),
        Location::File(File {
            name: "README.md",
            size_kb: 4340,
        }),
    ],
};

pub fn get_folder(path: Vec<&str>) -> Option<&Directory> {
    let mut current_location = &ROOT_DIRECTORY;

    for name in path {
        let found_directory = current_location.items.into_iter().find_map(|location| {
            if let Location::Directory(child_directory) = location {
                if child_directory.name == name {
                    return Some(child_directory);
                }
            }

            None
        });

        if let Some(directory) = found_directory {
            current_location = directory;
        } else {
            return None;
        }
    }

    return Some(current_location);
}
