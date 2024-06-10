import { Path } from '@angular-devkit/core';

interface Location {
    name: string;
    path: Path;
}
declare function parseName(path: string, name: string): Location;

export { type Location, parseName };
