export const clamp = (min: number, value: number, max: number) => {
    return Math.max(min, Math.min(value, max));
}

export const getRandomizeArray = <T,>(arr: T[]): T[] => {
    if (!Array.isArray(arr)) throw new Error("The argument is not an Array");

    const newArr = [...arr];
    for (const i in newArr) {
        const randomIndex = Math.floor(Math.random() * newArr.length);
        ;[newArr[i], newArr[randomIndex]] = [newArr[randomIndex], newArr[i]];
    }

    return newArr;
}