
# change with the Node.js version of your choice
ARG NODE_VERSION="18.16.1"

# change with the Linux Alpine version of your choice
ARG ALPINE_VERSION="3.17"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS dependency-base

# install OpenSSL 1.1.x, needed for Linux Alpine 3.17+
RUN apk update && apk add openssl1.1-compat

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# copy the app, note .dockerignore
COPY package.json .
COPY package-lock.json .

FROM dependency-base AS production-base

# build will also take care of building
# if necessary
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS production

COPY --from=production-base /app/.output /app/.output

# Run in production mode
ENV NODE_ENV=production

# start the app
CMD [ "node", "/app/.output/server/index.mjs" ]