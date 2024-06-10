import { SpawnOptions } from 'child_process';

declare function spawnAsync(command: string, args: string[], options: SpawnOptions, collect?: boolean): Promise<void>;

export { spawnAsync };
