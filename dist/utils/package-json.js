'use strict';

function addElementToPackageJson(key, value) {
    return (tree, _context)=>{
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
function addScriptToPackageJson(scriptName, scriptCommand) {
    return (tree, _context)=>{
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

exports.addElementToPackageJson = addElementToPackageJson;
exports.addScriptToPackageJson = addScriptToPackageJson;
