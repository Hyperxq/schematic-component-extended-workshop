import { workspaces, json } from '@angular-devkit/core';
import { Tree, Rule } from '@angular-devkit/schematics';

type WorkspaceDefinition = workspaces.WorkspaceDefinition;
type ProjectDefinition = workspaces.ProjectDefinition;
type TargetDefinition = workspaces.TargetDefinition;
declare class TreeWorkspaceHost implements workspaces.WorkspaceHost {
    private readonly tree;
    constructor(tree: Tree);
    readFile(path: string): Promise<string>;
    writeFile(path: string, data: string): Promise<void>;
    isDirectory(path: string): Promise<boolean>;
    isFile(path: string): Promise<boolean>;
}
declare function updateWorkspace(updater: (workspace: WorkspaceDefinition) => void | Rule | PromiseLike<void | Rule>): Rule;
declare function getWorkspace(tree: Tree, path?: string): Promise<WorkspaceDefinition>;
declare function writeWorkspace(tree: Tree, workspace: WorkspaceDefinition, path?: string): Promise<void>;
declare function buildDefaultPath(project: workspaces.ProjectDefinition): string;
declare function createDefaultPath(tree: Tree, projectName: string): Promise<string>;
declare function allWorkspaceTargets(workspace: workspaces.WorkspaceDefinition): Iterable<[string, workspaces.TargetDefinition, string, workspaces.ProjectDefinition]>;
declare function allTargetOptions(target: workspaces.TargetDefinition, skipBaseOptions?: boolean): Iterable<[string | undefined, Record<string, json.JsonValue | undefined>]>;
declare function getDefaultProjectName(workspace: WorkspaceDefinition): string;

export { type ProjectDefinition, type TargetDefinition, TreeWorkspaceHost, type WorkspaceDefinition, allTargetOptions, allWorkspaceTargets, buildDefaultPath, createDefaultPath, getDefaultProjectName, getWorkspace, updateWorkspace, writeWorkspace };
