import * as _angular_devkit_schematics from '@angular-devkit/schematics';
import { Tree, SchematicContext } from '@angular-devkit/schematics';

declare enum NodeDependencyType {
    Default = "dependencies",
    Dev = "devDependencies",
    Peer = "peerDependencies",
    Optional = "optionalDependencies"
}
interface NodeDependency {
    type: NodeDependencyType;
    name: string;
    version: string;
    overwrite?: boolean;
}
declare function addPackageJsonDependency(tree: Tree, dependency: NodeDependency, pkgJsonPath?: string): void;
declare function removePackageJsonDependency(tree: Tree, name: string, pkgJsonPath?: string): void;
declare function getPackageJsonDependency(tree: Tree, name: string, pkgJsonPath?: string): NodeDependency | null;
declare function installDependencies(context: SchematicContext, packageManager?: string): _angular_devkit_schematics.Rule;

export { type NodeDependency, NodeDependencyType, addPackageJsonDependency, getPackageJsonDependency, installDependencies, removePackageJsonDependency };
