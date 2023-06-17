import { setAbsoluteSqliteDatabaseUrlForPrisma } from "./prisma/utils";

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

setAbsoluteSqliteDatabaseUrlForPrisma();

export default defineNuxtConfig({
  extends: ["@sidebase/core"],
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "@huntersofbook/naive-ui-nuxt"
  ],
  runtimeConfig: {
    version: "0.0.1",
    public: {
      nuxtPublicBaseApiUrl: "http://localhost:3000/api",
      nuxtPublicBaseApiBrowserUrl: "http://localhost:3000/api",
    },
  },
  build: {
    transpile: ['trpc-nuxt']
  },
  typescript: {
    shim: false,
  },
  auth: {
    origin: process.env.ORIGIN || "http:localhost:3000",
  },
});
