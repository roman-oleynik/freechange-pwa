export function getArrayFromObject<T>(object: object): Array<T> {
    return (Object.keys(object) as Array<keyof object>).map(key => {
        return object[key];
    });
};