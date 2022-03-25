use argon2;

pub struct User {
    pub id: &'static str,
    pub username: &'static str,
    pub password: &'static str,
}

const USERS: [User; 2] = [
    User {
        id: "1",
        password: "$argon2i$v=19$m=4096,t=3,p=1$cmFuZG9tc2FsdDI1$crFi9zLftzxAri3geuHvdWhbVwZZppSvdZW+FEpStAw", // weirdcloud46
        username: "Patricia12",
    },
    User {
        id: "2",
        password:"$argon2i$v=19$m=4096,t=3,p=1$cmFuZG9tc2FsdDU0$Kqy+jKgqI05K/n+wtaQYQFb2vNovWb2+qCyuxRAxj9s", // calmsnake34
        username: "Robert74",
    },
];

pub fn get_user_by_credentials(username: &str, password: &str) -> Option<User> {
    USERS
        .into_iter()
        .find(|user| username.eq(user.username))
        .into_iter()
        .find(|user| compare_passwords(user.password, password))
}

pub fn get_user_by_id(id: &str) -> Option<User> {
    USERS.into_iter().find(|user| user.id == id)
}

pub fn compare_passwords(hashed: &str, password: &str) -> bool {
    argon2::verify_encoded(hashed, password.as_bytes()).unwrap_or_default()
}
