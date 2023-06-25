# definitely-not-crosswords

this is a [sidebase cheviot](https://sidebase.io/) app created by running `npm create sidebase@latest`. this project uses the following technologies for a great developer- and user-experience:
- [typescript](https://www.typescriptlang.org/)
- [nuxt 3](https://nuxt.com)
- database models, migrations, queries and easy db-switching via prisma
- deep prisma integration: use the client in your endpoints via nuxt-prisma, prisma client is auto-generated for npm run dev and other commands and more
- frontend- and backend data-transformation via nuxt-parse and zod
- in-memory development sql-database via sqlite3
- linting via eslint
- test management, test ui, component snapshotting via vitest
- component tests via test-library/vue
- nuxt 3 native api testing via @nuxt/test-utils
- code coverage via c8
- css utilities via tailwindcss
- css components via naive ui
- type checking in script and template via volar / vue-tsc
- code editor configuration via .editorconfig files and a portable .settings/ folder whith best-practice vs code settings and extensions for vue 3 / nuxt 3 development

## how to get going?

this is a straight-forward setup with minimal templating and scaffolding. the options you selected during the sidebase cli setup are all here though. good places to continue reading are:
- [sidebase website](https://sidebase.io/)

some tasks you should probably do in the beginning are:
- [ ] replace this generic readme with a more specific one
- [ ] install the vue volar extension
- [ ] enable [volar takeover mode](https://nuxt.com/docs/getting-started/installation#prerequisites) to ensure a smooth editor setup
- [ ] [install nuxt 3 devtools](https://github.com/nuxt/devtools#installation) if you want to use them


### setup

make sure to install the dependencies:

```bash
npm install
```

### development server

start the development server on http://localhost:3000

```bash
npm run dev
```

### production

build the application for production:

```bash
npm run build
```

locally preview production build:

```bash
npm run preview
```

# environment(s)
| env - | data persistence--- | location ------ | description ----------------------------------------------------- |
| ----- | ------------------- | --------------- | ----------------------------------------------------------------- |
| local | non-persistent data | local machine   | used for development on a local machine                           |
| devl  | non-persistent data | cloud           | used for testing development in a cloud cluster                   |
| test  | persistent data     | cloud           | used for testing deployments, migrations, and user administration |
| prod  | persistent data     | cloud           | main application cluster for users                                |
| ----- | ------------------- | --------------- | ----------------------------------------------------------------- |

# todo(s)

### general application
- [ ] websocket channel per game room
- [ ] restrict selection of question/cell when another gamemember has selected
- [ ] ? chat
- [ ] refactor grid cell into component
- [ ] actions timeline
- [ ] validate answers on server side (and don't send answer to client)

### scrape
- [ ] refactor scraper code into abstract class
- [ ] setup cron that calls all scrapers on a specific basis
- [ ] ensure scraper code is idempotent + add db columns for tracking game source
- [ ] implement nyc scraper in generic class
- [ ] verify sprite scraper code in a container
- [ ] figure out how to store sprite in a postgress/prisma column
- [ ] create db entry for sprite
- [ ] refactor sprite scraper code to store in filestorage and use sprite db entry w/ linked filestorage url

### infrastructure
- [ ] ? cluster setup code per environment
- [ ] kustomization
- [ ] k8s deployments + environments
- [ ] correct environments setup
- [ ] logging/metrics k8s components
- [ ] error logging
- [ ] api logging
- [ ] ci/cd pipeline
- [ ] ? api tracing

### testing
- [ ] ? unit testing
- [ ] e2e tests during deployment
- [ ] validation of schema migrations pre-production

### ui/ux
- [ ] 404 fallback pages
- [ ] first login page
- [ ] user profile customization page
- [ ] user sprite selection component
- [ ] new game page
- [ ] manage game members component
- [ ] game stats component
- [ ] completed game page

### security
- [ ] finalize auth flow
- [ ] authz for user specific resources
- [ ] ? delete user
