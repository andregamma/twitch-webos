import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  {
    files: ["apps/twitch-webos-app/*.js"],
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    rules: {
      "plugin:react/jsx-runtime": "off",
    },
    languageOptions: { globals: globals.browser },
  },
];