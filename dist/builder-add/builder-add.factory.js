'use strict';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ function builderAddFactory() {
    return ()=>{
        console.info('This schematics will be executed when user executes builder add [collection-name]');
    };
}

exports.builderAddFactory = builderAddFactory;
