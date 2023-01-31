export function useDeepCopy(oldObj) {
    let newObject = JSON.parse(JSON.stringify(oldObj));
    return newObject;
}