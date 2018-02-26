# npm-scripts-config
`npm-scripts-config` can extract scripts from package.json inside a config file that can be shared between repositories.

# Installation

This npm package should be installed as a dev dependency.

```shell
$ npm install --save--dev npm-scripts-config
```

# Usage

`.scriptsrc` files will be automatically used as the default configuration file and scripts defined in it could be used from the `package.json`'s scripts section.

**package.json**

```json
{
    [...]
    "scripts": {
        "test": "npm-scripts-config test"
    },
    [...]
}
```

**.scriptsrc**

```json
{
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

From your repository you can run your scripts like standard npm scripts:

```shell
npm run test
```

or

```shell
yarn test
```

## Extend a configuration from `node_modules`

If you want to reuse a shared configuration you can specify it using the `@extends` key.

**.scriptsrc**

```json
{
    "@extends": "my-custom-npm-package-name"
}
```

Where the npm package `my-custom-npm-package-name` contains a `.scriptsrc` at its root.
