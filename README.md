# Folder app

The goal is to create a safe web application for browsing folders.

- [Folder app](#folder-app)
  - [Frontend](#frontend)
    - [Assets server](#assets-server)
    - [Tooling](#tooling)
    - [Routes](#routes)
      - [/](#)
      - [/login](#login)
      - [/not-found](#not-found)
      - [/folder/\*\*/\*](#folder)
    - [Design](#design)
  - [Backend](#backend)
    - [Tooling](#tooling-1)
    - [API](#api)
      - [GET /folder/\*\*/\*](#get-folder)
      - [POST /session](#post-session)
      - [GET /session](#get-session)
      - [DELETE /session](#delete-session)
  - [Security considerations](#security-considerations)
  - [Branch naming convention](#branch-naming-convention)
  - [Tests](#tests)

## Frontend

Typical single page application.

### Assets server

> SAFETY NOTE:
> The server should serve assets via [HTTPS](https://en.wikipedia.org/wiki/HTTPS).
> I will not implement that.

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

A login screen where an unauthenticated user is automatically redirected to (and then taken back to the original URL).

eg.:

1. unauthenticated enters protected route `/folder/foo/bar`
2. redirect to `/login?redirected_from=/folder/foo/bar`
3. user logs in
4. redirect to `redirected_from`

#### /not-found

Not found page, where a user is automatically redirected to in case folder, does not exist.

#### /folder/\*\*/\*

The page displays single folder content. User can filter files and folders in current directory using input.

### Design

See [figma](https://www.figma.com/file/J6yvOILo6HM62FnHXaAAOC/FolderApp?node-id=0%3A1)

- Based on google drive (material design).
- Icons by [Icons8](https://icons8.com/)

## Backend

Folder data service. In-memory session authentication.

### Tooling

- [rust](https://www.rust-lang.org/)
- [rocket](https://rocket.rs/)
- [serde](https://serde.rs/)
- [docker](https://www.docker.com/)

### API

> SAFETY NOTE:
> In case we will use real DB to store data we should validate input against some kind of query injection (like SQL injection).

#### GET /folder/\*\*/\*

Returns folder data.

- **responds** with:

  - <span style="color:red;">error</span>, when a user is unauthenticated,

    ```ts
    HTTP/1.1 403 Forbidden
    ```

  - <span style="color:red;">error</span>, when a user is authenticated and the requested folder, doesn't exist,

    ```ts
    HTTP/1.1 404 Not found
    ```

  - <span style="color:green;">folder data</span> when the user is authenticated and the requested folder exists. A folder structure is always 1 level deep.

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

  - <span style="color:red;">error</span> when credentials don't match any user,

    ```ts
    HTTP/1.1 400 Bad request
    ```

  - <span style="color:green;">success</span> code when the session is created. The `FOLDER-APP-TOKEN` cookie will store `JWT` and will be valid for one day.
    `FOLDER-APP-TOKEN`. `JWT` public claims will contain user's `id`.

    ```ts
    HTTP/1.1 200 Ok
    Set-Cookie: FOLDER-APP-TOKEN=a3fWa; Expires=Wed, 22 Mar 2022 07:28:00 GMT; SameSite=Strict; Secure; HttpOnly
    ```

#### GET /session

Check if user is authenticated.

- **responds** with:

  - information about user authentication

    ```ts
    HTTP/1.1 200 Ok

    {
      isLogged: boolean,
    }
    ```

#### DELETE /session

Logout.

- **responds** with:

  - <span style="color:red;">error</span> when session didn't exist

    ```ts
    HTTP/1.1 400 Bad request
    ```

  - <span style="color:green;">success</span> code when the session is deleted. Sets session cookie expiration date to past date
    ```ts
    HTTP/1.1 200 Ok
    Set-Cookie: FOLDER-APP-TOKEN=none; Expires=Wed, 15 Mar 2022 07:28:00 GMT; SameSite=Strict; Secure; HttpOnly
    ```

## Security considerations

All general things we should consider when writing a secure app:

> SAFETY NOTE:
> Handle exceptions/errors.

> SAFETY NOTE:
> The server should be protected against Brute-force/DDoS attacks (eg. one host can only use API a few times per minute).
> I will not implement that.

> SAFETY NOTE:
> Educate self and other people about security vulnerabilities.

> SAFETY NOTE:
> If this is for internal usage we should hide it in our secure `VPN`.
> I will not implement that.

> SAFETY NOTE:
> The app should be [protected against CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
> I will try to implement that if I will have time.

> SAFETY NOTE:
> Folder service should provide `Access-Control-Allow-Origin` only to our frontend origin.

> SAFETY NOTE:
> Make sure that we cover other [most common security vulnerabilities](https://owasp.org/www-project-top-ten/).
> I will not implement that.

> SAFETY NOTE:
> We should write e2e/automated tests to be sure that these cases are covered.
> I will not implement that.

## Branch naming convention

`numberOfTask-short-descriptive-name`
eg.
`0-create-design-document`

## Tests

I decided not to cover all cases only the most important ones (since this is a demonstration):

- on frontend:

  - if the authenticated user is able to browse folders

- on backend:
  - if an authenticated user can get folder data
  - if an unauthenticated user cannot get folder data
