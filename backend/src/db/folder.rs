pub struct File {
    pub size_kb: f64,
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
    name: "root",
    items: &[
        Location::File(File {
            name: "index.js",
            size_kb: 2333.0,
        }),
        Location::File(File {
            name: "lorem-ipsum-dolor-sit-amet.js",
            size_kb: 23.0,
        }),
        Location::Directory(Directory {
            name: "nested",
            items: &[
                Location::Directory(Directory {
                    name: "bar",
                    items: &[
                        Location::File(File {
                            name: "main.js",
                            size_kb: 0.5,
                        }),
                        Location::File(File {
                            name: "teleport.go",
                            size_kb: 320.0,
                        }),
                        Location::File(File {
                            name: "test.go",
                            size_kb: 3320.0,
                        }),
                    ],
                }),
                Location::File(File {
                    name: "test.go",
                    size_kb: 3320.5,
                }),
            ],
        }),
        Location::Directory(Directory {
            name: "favorites",
            items: &[],
        }),
        Location::Directory(Directory {
            name: "music",
            items: &[],
        }),
        Location::Directory(Directory {
            name: "css",
            items: &[],
        }),
        Location::File(File {
            name: "db",
            size_kb: 1247623652.0,
        }),
        Location::Directory(Directory {
            name: "README.md",
            items: &[],
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
