# NaaVRE PaaS frontend

Frontend for the NaaVRE PaaS

## Development

Start the backend services that the PaaS frontend needs to connect to:

```shell
docker compose -f dev/docker-compose.yaml up -d
```

Alternatively, use the devcontainer included in the repo.

Install the development dependencies:

```shell
npm install
```

Start the development server:

```shell
npm run dev
```

Open http://localhost:29300/vreapp.

To log in, use the following credentials:

| Username     | Password     |
|--------------|--------------|
| `user`       | `user`       |
| `other-user` | `other-user` |


### Backend services configuration (advanced)

The NaaVRE PaaS frontend connects to the [NaaVRE-catalogue-service](https://github.com/NaaVRE/NaaVRE-catalogue-service/) and to Keycloak.
Both are run in Docker compose ([dev/docker-compose.yaml](dev/docker-compose.yaml)).
They are set up with reasonable defaults and test data, but you might need to change them.

The **NaaVRE-catalogue-service** can be accessed at http://localhost:29800/.
The admin interface is at http://localhost:29800/admin/.
Login with username `admin` and password `admin`.
You can make temporary changes to the test data through the admin interface.
To make permanent changes, edit [dev/catalogue-fixtures.json](dev/catalogue-fixtures.json).

**Keycloak** can be accessed at http://localhost:29801.
Login with username `admin` and password `admin`.
You can make temporary changes to the settings through the admin interface.
To make permanent changes, edit [dev/keycloak-realm.json](dev/keycloak-realm.json).
