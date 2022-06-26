const withTM = require("next-transpile-modules")(["@turbyo/ui"]);

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
});
