import { JsonValue } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';

type InsertionIndex = (properties: string[]) => number;
type JSONPath = (string | number)[];
declare class JSONFile {
    private readonly host;
    private readonly path;
    content: string;
    private eol;
    constructor(host: Tree, path: string);
    private _jsonAst;
    private get JsonAst();
    get(jsonPath: JSONPath): unknown;
    modify(jsonPath: JSONPath, value: JsonValue | undefined, insertInOrder?: InsertionIndex | false): void;
    remove(jsonPath: JSONPath): void;
}

export { type InsertionIndex, JSONFile, type JSONPath };
