const withTM = require("next-transpile-modules")(["@turbyo/ui", "@turbyo/api"]);

module.exports = withTM({
  reactStrictMode: true,
  experiment: {
    externalDir: true,
  },
});
