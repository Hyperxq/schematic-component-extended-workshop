import { ProjectDefinition, WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import {
  MergeStrategy,
  Rule,
  Tree,
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  filter,
  mergeWith,
  move,
  noop,
  renameTemplateFiles,
  strings,
  url,
} from '@angular-devkit/schematics';
import { join } from 'path';
import { parseName } from '../../utils/parse-name';
import { getDefaultProjectName, getWorkspace } from '../../utils/workspaces';
import { ComponentOptions } from './schema';

export function componentFactory(options: ComponentOptions): Rule {
  return async (tree: Tree) => {
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
     */

    const workspace: WorkspaceDefinition = await getWorkspace(tree);

    const project = options.project ?? getDefaultProjectName(workspace);

    const { sourceRoot, prefix }: ProjectDefinition = workspace.projects.get(project);

    const projectPath = `${sourceRoot}/${prefix}`;

    return chain([
      externalSchematic('@schematics/angular', 'component', {
        ...componentOptions,
        project,
      }),
      !skipStorybook ? addStorybookFile(projectPath, options.name) : noop(),
    ]);
  };
}

function addStorybookFile(project: string, name: string): Rule {
  return () => {
    const { path, name: fileName } = parseName('./', name);

    const urlTemplates = ['__name@dasherize__.stories.ts.template'];

    const template = apply(url('./files'), [
      filter((path) => urlTemplates.some((urlTemplate) => path.includes(urlTemplate))),
      applyTemplates({
        ...strings,
        name: fileName,
      }),
      renameTemplateFiles(),
      move('\\' + path + join(project, strings.dasherize(fileName))),
    ]);

    return mergeWith(template, MergeStrategy.Overwrite);
  };
}
