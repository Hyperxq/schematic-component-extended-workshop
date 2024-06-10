import * as ansiColors from 'ansi-colors';

declare function removeColor(text: string): string;
declare const colors: typeof ansiColors;

export { colors, removeColor };
