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
- [the first steps documentation](https://sidebase.io/sidebase/usage)
- [our discord](https://discord.gg/auc8ecegzx)

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

### infrastructure
- [ ] k8s deployments + environments
- [ ] correct environment setup
- [ ] error logging
- [ ] api logging
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
