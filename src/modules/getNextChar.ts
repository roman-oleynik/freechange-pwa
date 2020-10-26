export function getNextChar(char: string): string {
    let nextChar = "";
    if (Boolean(char)) {
        nextChar = String.fromCharCode(char.charCodeAt(0) + 1);
    }
    return nextChar;
}