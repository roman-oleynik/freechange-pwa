export function isURL(address: string): boolean {
    if (address.slice(0,4) === "http") {
        return true;
    } else {
        return false;
    }
}