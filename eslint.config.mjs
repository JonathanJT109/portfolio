import nextConfig from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      quotes: "off",
      "no-useless-escape": "off",
    },
  },
];

export default eslintConfig;
