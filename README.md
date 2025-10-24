# 🚀 Vehicle Explorer (Angular + Nx)

This project is an **Angular micro-frontend workspace** powered by **Nx**.  
It consists of a shell application that dynamically loads two remote apps — **List** and **Detail** — along with supporting libraries for data and shared UI logic.

---

## 🧩 Workspace Structure

| Project | Type | Description |
|----------|------|--------------|
| **shell** | App (host) | The main container / entry point of the platform. |
| **list** | App (remote) | Displays available vehicles or categories. |
| **detail** | App (remote) | Shows details for a selected vehicle. |
| **page** | Lib | Shared UI components and utilities. |
| **data** | Lib | Data access layer and API services. |

---


## Development
Run all apps locally

```bash
npm run serve
```

Starts the shell and automatically runs the remotes list and detail in development mode using Module Federation.

- Shell: http://localhost:4200
- List: http://localhost:4201
- Detail: http://localhost:4202

*(Ports may vary depending on your Nx configuration.)*

### Run individual apps

```bash
npm run serve:list
npm run serve:detail
```

Useful for focused development or debugging a specific remote.


## Testing

Run all unit tests with coverage:
```bash
npm test
```

Run tests for specific projects:
```bash
npm run test:data
npm run test:page
npm run test:shell
npm run test:detail
npm run test:list
```

Coverage reports are generated under coverage/PROJECT_NAME/.

## End-to-End (E2E) Tests

Each app has its own Cypress E2E project:

```bash
npm run e2e:shell
npm run e2e:list
npm run e2e:detail
```

E2E tests live under apps/PROJECT_NAME-e2e/ and run with Cypress.

## Notes

- This workspace uses Module Federation to load remotes dynamically.
- Shared logic (models, services, and UI components) should live in libraries under /libs.
- For local development, ensure all remote apps are running before opening the shell.
