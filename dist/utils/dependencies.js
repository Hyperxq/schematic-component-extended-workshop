'use strict';

var schematics = require('@angular-devkit/schematics');
var tasks = require('@angular-devkit/schematics/tasks');
var utils_jsonFile = require('./json-file.js');

const PKG_JSON_PATH = '/package.json';
exports.NodeDependencyType = void 0;
(function(NodeDependencyType) {
    NodeDependencyType["Default"] = "dependencies";
    NodeDependencyType["Dev"] = "devDependencies";
    NodeDependencyType["Peer"] = "peerDependencies";
    NodeDependencyType["Optional"] = "optionalDependencies";
})(exports.NodeDependencyType || (exports.NodeDependencyType = {}));
const ALL_DEPENDENCY_TYPE = [
    "dependencies",
    "devDependencies",
    "optionalDependencies",
    "peerDependencies"
];
function addPackageJsonDependency(tree, dependency, pkgJsonPath = PKG_JSON_PATH) {
    const json = new utils_jsonFile.JSONFile(tree, pkgJsonPath);
    const { overwrite, type, name, version } = dependency;
    const path = [
        type,
        name
    ];
    if (overwrite || !json.get(path)) {
        json.modify(path, version);
    }
}
function removePackageJsonDependency(tree, name, pkgJsonPath = PKG_JSON_PATH) {
    const json = new utils_jsonFile.JSONFile(tree, pkgJsonPath);
    for (const depType of ALL_DEPENDENCY_TYPE){
        json.remove([
            depType,
            name
        ]);
    }
}
function getPackageJsonDependency(tree, name, pkgJsonPath = PKG_JSON_PATH) {
    const json = new utils_jsonFile.JSONFile(tree, pkgJsonPath);
    for (const depType of ALL_DEPENDENCY_TYPE){
        const version = json.get([
            depType,
            name
        ]);
        if (typeof version === 'string') {
            return {
                type: depType,
                name: name,
                version
            };
        }
    }
    return null;
}
function installDependencies(context, packageManager = 'npm') {
    context.addTask(new tasks.NodePackageInstallTask({
        packageManager
    }));
    return schematics.noop();
}

exports.addPackageJsonDependency = addPackageJsonDependency;
exports.getPackageJsonDependency = getPackageJsonDependency;
exports.installDependencies = installDependencies;
exports.removePackageJsonDependency = removePackageJsonDependency;
