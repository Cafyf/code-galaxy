export default class ObjectUtils {
    static isNullOrUndefinedOrEmpty(value) {
        return (
            value === null || 
            value === undefined || 
            (typeof value === 'string' && value.trim() === '') ||  // Empty string
            (Array.isArray(value) && value.length === 0) ||        // Empty array
            (typeof value === 'object' && value !== null && Object.keys(value).length === 0) // Empty object
        );
    }

    static deepCopy(obj) {
        // If obj is an array, create a new array and recursively copy each item
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepCopy(item));  // Correctly copy each array item
        }
        // If obj is a primitive value (string, number, boolean), return it directly
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        // Create a shallow copy of the object
        const copy = Object.assign({}, obj);
        
        // Loop over the keys of the copied object
        Object.keys(copy).forEach(key => {
            // If the value is an object, recursively call deepCopy on the nested object
            if (typeof copy[key] === 'object' && copy[key] !== null) {
                copy[key] = this.deepCopy(copy[key]);
            }
        });

        return copy;
    }
}
