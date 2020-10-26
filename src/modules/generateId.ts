export function generateId(ID?: string): string {
    if (ID) return ID;
    const symbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let id = [];
    for ( let i = 0; i < 24; i++ ) {
        let rand: number = Math.floor(Math.random()*symbols.length);
        id.push(symbols[rand]);
    }
    return id.join("");
}