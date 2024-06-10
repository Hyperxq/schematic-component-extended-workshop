import { Rule } from '@angular-devkit/schematics';

declare function addElementToPackageJson(key: string, value: string | object): Rule;
declare function addScriptToPackageJson(scriptName: string, scriptCommand: string): Rule;

export { addElementToPackageJson, addScriptToPackageJson };
