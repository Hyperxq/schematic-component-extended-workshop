'use strict';

var schematics = require('@angular-devkit/schematics');
var path = require('path');
var utils_parseName = require('../../utils/parse-name.js');
var utils_workspaces = require('../../utils/workspaces.js');

function componentFactory(options) {
    return async (tree)=>{
        const { skipStorybook, ...componentOptions } = options;
        /*
     * 1. Modify schema.json.
     * 2. Add utils.
     * 3. call externalSchematic('collection-name', 'schematic-name', options), schematic('schematic-name', options)
     * 4. add storybook file.
     *    a. si no viene el atributo proyecto vamos a obtener el proyecto by default.
     *    b. Generamos el proyecto path.
     *    c. Crear la función que agrega el archivo de storybook.
     *    d. Extraer posible path of the name.
     */ const workspace = await utils_workspaces.getWorkspace(tree);
        const project = options.project ?? utils_workspaces.getDefaultProjectName(workspace);
        const { sourceRoot, prefix } = workspace.projects.get(project);
        const projectPath = `${sourceRoot}/${prefix}`;
        return schematics.chain([
            schematics.externalSchematic('@schematics/angular', 'component', {
                ...componentOptions,
                project
            }),
            !skipStorybook ? addStorybookFile(projectPath, options.name) : schematics.noop()
        ]);
    };
}
function addStorybookFile(project, name) {
    return ()=>{
        const { path: path$1, name: fileName } = utils_parseName.parseName('./', name);
        const urlTemplates = [
            '__name@dasherize__.stories.ts.template'
        ];
        const template = schematics.apply(schematics.url('./files'), [
            schematics.filter((path)=>urlTemplates.some((urlTemplate)=>path.includes(urlTemplate))),
            schematics.applyTemplates({
                ...schematics.strings,
                name: fileName
            }),
            schematics.renameTemplateFiles(),
            schematics.move('\\' + path$1 + path.join(project, schematics.strings.dasherize(fileName)))
        ]);
        return schematics.mergeWith(template, schematics.MergeStrategy.Overwrite);
    };
}

exports.componentFactory = componentFactory;
