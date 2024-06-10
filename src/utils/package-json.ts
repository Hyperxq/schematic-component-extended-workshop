import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function addElementToPackageJson(key: string, value: string | object): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJsonPath = '/package.json';
    if (!tree.exists(packageJsonPath)) {
      _context.logger.warn('❗ package.json not found in the project root');

      return tree;
    }

    const packageJsonString = tree.read(packageJsonPath)?.toString('utf-8');
    const packageJson = JSON.parse(packageJsonString);

    packageJson[key] = value;

    tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2));

    return tree;
  };
}

export function addScriptToPackageJson(scriptName: string, scriptCommand: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJsonPath = '/package.json';
    if (!tree.exists(packageJsonPath)) {
      _context.logger.warn('❗ package.json not found in the project root');

      return tree;
    }
    // Read the package.json file and parse its content
    const packageJsonString = tree.read(packageJsonPath)?.toString('utf-8');
    const packageJson = JSON.parse(packageJsonString);

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    packageJson.scripts[scriptName] = scriptCommand;
    // Write the modified package.json content back to the file
    tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2));

    return tree;
  };
}
