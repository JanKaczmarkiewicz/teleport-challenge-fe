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

## Backend

Folder data service. In memory session authentication (in real world we should use redis).

### Tooling

- [rust](https://www.rust-lang.org/)
- [rocket](https://rocket.rs/)
- [serde](https://serde.rs/)
- [docker](https://www.docker.com/)

### Api

> SAFETY NOTE:
> In case we will use real DB to store data we should validate input against some kind of query injection (like SQL injection).
> Each endpoint should be protected against Brute-force/DDoS attack (eg. one host can only use api few times per minute). I will not implement that.

#### GET /folder/\*\*/\*

Returns folder data.

- **responds** with:

  - <span style="color:red;">error</span> when user is unauthenticated

    ```ts
    HTTP/1.1 403 Forbidden
    ```

  - <span style="color:red;">error</span> when user is authenticated and requested folder doesn't exist

    ```ts
    HTTP/1.1 404 Not found
    ```

  - <span style="color:green;">folder data</span> when user is authenticated and requested folder exist. Folder structure is always 1 level deep.

    ```ts
    HTTP/1.1 200 Ok

    {
        name: 'bar',
        items: [
            {
                type: 'dir',
                sizeKb: 0,
                name: string
            },
            {
                type: 'file',
                sizeKb: number,
                name: string
            }
        ]
    }
    ```

#### POST /session

Login.

- **accepts**:

  ```ts
  {
      name: string,
      password: string
  }
  ```

- **responds** with:

  - <span style="color:red;">error</span> when credensials doesn't match any user

    ```ts
    HTTP/1.1 400 Bad request
    ```

  - <span style="color:green;">success</span> code when session is created

    ```ts
    HTTP/1.1 200 Ok
    ```

#### DELETE /session

Logout.

- **responds** with:

  - <span style="color:red;">error</span> when session didn't exist

    ```ts
    HTTP/1.1 400 Bad request
    ```

  - <span style="color:green;">success</span> code when session is deleted
    ```ts
    HTTP/1.1 200 Ok
    ```
