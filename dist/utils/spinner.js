'use strict';

var ora = require('ora');
var utils_color = require('./color.js');

class Spinner {
    set text(text) {
        this.spinner.text = text;
    }
    succeed(text) {
        if (this.enabled) {
            this.spinner.succeed(text);
        }
    }
    info(text) {
        this.spinner.info(text);
    }
    fail(text) {
        this.spinner.fail(text && utils_color.colors.redBright(text));
    }
    warn(text) {
        this.spinner.warn(text && utils_color.colors.yellowBright(text));
    }
    stop() {
        this.spinner.stop();
    }
    start(text) {
        if (this.enabled) {
            this.spinner.start(text);
        }
    }
    constructor(text){
        /** When false, only fail messages will be displayed. */ this.enabled = true;
        this.spinner = ora({
            text,
            // The below 2 options are needed because otherwise CTRL+C will be delayed
            // when the underlying process is sync.
            hideCursor: false,
            discardStdin: false
        });
    }
}

exports.Spinner = Spinner;
