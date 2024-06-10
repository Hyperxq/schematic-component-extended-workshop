'use strict';

var node_os = require('node:os');

const CRLF = '\r\n';
const LF = '\n';
function getEOL(content) {
    const newlines = content.match(/(?:\r?\n)/g);
    if (newlines?.length) {
        const crlf = newlines.filter((l)=>l === CRLF).length;
        const lf = newlines.length - crlf;
        return crlf > lf ? CRLF : LF;
    }
    return node_os.EOL;
}

exports.getEOL = getEOL;
