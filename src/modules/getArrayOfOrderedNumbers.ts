export function getArrayOfOrderedNumbers (amount: number) {
    let result: number[] = [];
    
    for (let i = 1; i <= amount; i++) {
      result.push(i);
    }
    
    return result;
};