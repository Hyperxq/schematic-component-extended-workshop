# Getting Started With Schematics

Welcome to the My Schematic Project! This project is a collection of schematics designed to automate and streamline your development process.

## Installation

To get started, you'll need to install the Schematics CLI and Project Builder CLI. You can do this via npm:

```sh
npm install -g @angular-devkit/schematics-cli @pbuilder/cli
```

## Creating a Schematic

To create a new schematic library project, run:
```sh
npx @pbuilder/cli new my-schematic author-1
```

This command will set up the project structure for your schematics.

## Executing Schematics


## Testing Locally

### Using Schematics CLI
To test your schematics locally using the Schematics CLI, run:

```sh
schematics [dist-collection-path]:[schematic-name] [options]
```

### Using Verdaccio

Verdaccio is a lightweight private npm proxy registry that you can use to publish and test your schematics locally. Make sure you have Verdaccio installed and running. To publish your schematic to Verdaccio, add the following npm script to your package.json:

```json
    "scripts": {
    "publish:verdaccio": "npm publish --registry http://localhost:4873"
    }
```

To publish and test your schematic:
1. Start Verdaccio:

```sh
npx verdaccio
```
2. Publish your schematic to Verdaccio:

```sh
npm run publish:verdaccio
```
3. Install and execute your schematic from Verdaccio:

```sh
npm install my-schematic --registry http://localhost:4873
schematics my-schematic:my-rule
```

## Documentation
For more detailed instructions and options, visit the (Schematics Documentation)[https://schematics.pbuilder.dev/installation/].

## Contributing
We welcome contributions! Please read our (Contributing)[/CONTRIBUTING.md] Guidelines for details on our code of conduct and the process for submitting pull requests.
