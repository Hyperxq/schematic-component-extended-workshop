'use strict';

var jsoncParser = require('jsonc-parser');
var utils_eol = require('./eol.js');

/** @private */ class JSONFile {
    get JsonAst() {
        if (this._jsonAst) {
            return this._jsonAst;
        }
        const errors = [];
        this._jsonAst = jsoncParser.parseTree(this.content, errors, {
            allowTrailingComma: true
        });
        if (errors.length) {
            const { error, offset } = errors[0];
            throw new Error(`Failed to parse "${this.path}" as JSON AST Object. ${jsoncParser.printParseErrorCode(error)} at location: ${offset}.`);
        }
        return this._jsonAst;
    }
    get(jsonPath) {
        const jsonAstNode = this.JsonAst;
        if (!jsonAstNode) {
            return undefined;
        }
        if (jsonPath.length === 0) {
            return jsoncParser.getNodeValue(jsonAstNode);
        }
        const node = jsoncParser.findNodeAtLocation(jsonAstNode, jsonPath);
        return node === undefined ? undefined : jsoncParser.getNodeValue(node);
    }
    modify(jsonPath, value, insertInOrder) {
        let getInsertionIndex;
        if (insertInOrder === undefined) {
            const property = jsonPath.slice(-1)[0];
            getInsertionIndex = (properties)=>[
                    ...properties,
                    property
                ].sort().findIndex((p)=>p === property);
        } else if (insertInOrder !== false) {
            getInsertionIndex = insertInOrder;
        }
        const edits = jsoncParser.modify(this.content, jsonPath, value, {
            getInsertionIndex,
            formattingOptions: {
                eol: this.eol,
                insertSpaces: true,
                tabSize: 2
            }
        });
        this.content = jsoncParser.applyEdits(this.content, edits);
        this.host.overwrite(this.path, this.content);
        this._jsonAst = undefined;
    }
    remove(jsonPath) {
        if (this.get(jsonPath) !== undefined) {
            this.modify(jsonPath, undefined);
        }
    }
    constructor(host, path){
        this.host = host;
        this.path = path;
        this.content = this.host.readText(this.path);
        this.eol = utils_eol.getEOL(this.content);
    }
}

exports.JSONFile = JSONFile;
