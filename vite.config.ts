const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const path = require("path");

module.exports = defineConfig(async ({ mode }) => {
  const plugins = [react()];
  // Load componentTagger in development mode
  if (mode === "development") {
    try {
      // console.log("OK");
    } catch (error) {
      console.warn("Could not load", error.message);
    }
  }
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
