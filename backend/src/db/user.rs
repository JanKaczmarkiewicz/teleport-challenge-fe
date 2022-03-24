pub struct User {
    pub id: &'static str,
    pub username: &'static str,
    pub password: &'static str,
}

const USERS: [User; 2] = [
    User {
        id: "1",
        password: "TODO",
        username: "andy",
    },
    User {
        id: "2",
        password: "TODO",
        username: "andy",
    },
];

pub fn get_user_by_credentials(username: &str, password: &str) -> Option<User> {
    USERS
        .into_iter()
        .find(|user| user.username == username)
        .into_iter()
        .find(|user| user.password == hash_password(password))
}

pub fn get_user_by_id(id: &str) -> Option<User> {
    USERS.into_iter().find(|user| user.id == id)
}

fn hash_password(password: &str) -> String {
    String::from(password)
}
