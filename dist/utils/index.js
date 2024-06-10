'use strict';

var utils_color = require('./color.js');
var utils_prompt = require('./prompt.js');
var utils_spinner = require('./spinner.js');
var utils_dependencies = require('./dependencies.js');
var utils_packageJson = require('./package-json.js');
var utils_commands = require('./commands.js');
var utils_parseName = require('./parse-name.js');



exports.colors = utils_color.colors;
exports.removeColor = utils_color.removeColor;
exports.askChoices = utils_prompt.askChoices;
exports.askConfirmation = utils_prompt.askConfirmation;
exports.askQuestion = utils_prompt.askQuestion;
exports.Spinner = utils_spinner.Spinner;
Object.defineProperty(exports, 'NodeDependencyType', {
	enumerable: true,
	get: function () { return utils_dependencies.NodeDependencyType; }
});
exports.addPackageJsonDependency = utils_dependencies.addPackageJsonDependency;
exports.getPackageJsonDependency = utils_dependencies.getPackageJsonDependency;
exports.installDependencies = utils_dependencies.installDependencies;
exports.removePackageJsonDependency = utils_dependencies.removePackageJsonDependency;
exports.addElementToPackageJson = utils_packageJson.addElementToPackageJson;
exports.addScriptToPackageJson = utils_packageJson.addScriptToPackageJson;
exports.spawnAsync = utils_commands.spawnAsync;
exports.parseName = utils_parseName.parseName;
