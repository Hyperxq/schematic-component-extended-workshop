/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { SpawnOptions, spawn } from 'child_process';

export function spawnAsync(
  command: string,
  args: string[],
  options: SpawnOptions,
  collect = false
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);

    if (collect) {
      child.stdout?.on('data', (data) => resolve(data.toString().replace(/\r\n|\n/, '')));
    }

    try {
      child.on('close', (code) => {
        if (code === 0) {
          resolve(null);
        } else {
          // TODO: Remove unused messages
          console.error(`Failed to execute command: ${command}`);
          reject();
        }
      });
      child.on('error', (error) => {
        console.error('Spawn error:', error);
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
}
