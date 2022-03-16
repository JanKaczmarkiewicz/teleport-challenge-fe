# Folder app

The goal is to create web application for browsing folders.

## Frontend

Typical single page application.

### Assets server

![spa](/images/spa.png)

### Tooling

- [react](reactjs.org)
- [react-router](https://reactrouter.com/)
- [typescript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/)
- [vite](https://vitejs.dev/)
- [testing-library](https://testing-library.com/)
- [nginx](https://www.nginx.com/)
- [docker](https://www.docker.com/)

### Routes

#### /

Redirects user to `/folder`.

#### /login

A login screen where an unauthenticated user is automatically redirected to (and then taken back to original URL).

#### /not-found

Not found page where user is automatically redirected to in case folder does not exist.

#### /folder/\*\*/\*

Page displaying single folder content.

### Design

See [figma](https://www.figma.com/file/J6yvOILo6HM62FnHXaAAOC/HolderApp?node-id=0%3A1)

- Based on google drive (material design).
- Icons by [Icons8](https://icons8.com/)
