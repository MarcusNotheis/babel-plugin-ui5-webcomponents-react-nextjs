# babel-plugin-ui5-webcomponents-react-nextjs

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
