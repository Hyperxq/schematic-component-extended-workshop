'use strict';

var child_process = require('child_process');

function spawnAsync(command, args, options, collect = false) {
    return new Promise((resolve, reject)=>{
        const child = child_process.spawn(command, args, options);
        if (collect) {
            child.stdout?.on('data', (data)=>resolve(data.toString().replace(/\r\n|\n/, '')));
        }
        try {
            child.on('close', (code)=>{
                if (code === 0) {
                    resolve(null);
                } else {
                    // TODO: Remove unused messages
                    console.error(`Failed to execute command: ${command}`);
                    reject();
                }
            });
            child.on('error', (error)=>{
                console.error('Spawn error:', error);
            });
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    });
}

exports.spawnAsync = spawnAsync;
