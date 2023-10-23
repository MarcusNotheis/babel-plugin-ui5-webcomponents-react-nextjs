# babel-plugin-ui5-webcomponents-react-nextjs

# Deprecation Notice

This plugin is deprecated as UI5 Web Components for React is now supporting Next.js out of the box.
You can check out the official [documentation](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base-server-side-rendering--docs) for more details.

---

Babel Plugin to allow the usage of [UI5 Web Components for React](https://github.com/SAP/ui5-webcomponents-react) in [Next.js](https://nextjs.org/)

## Usage

**Prerequisite: you have created a Next.js app, e.g. by using `create-next-app`.**

1. Install the babel-plugin:

```shell
npm install @marcusnotheis/babel-plugin-ui5-webcomponents-react-nextjs --save-dev
```

2. Create `.babelrc` in the root of your project with the following content:
```json
{
  "presets": ["next/babel"],
  "plugins": ["@marcusnotheis/babel-plugin-ui5-webcomponents-react-nextjs"]
}

```

That's it :tada:. You can now run your app by starting `npm run dev`.
