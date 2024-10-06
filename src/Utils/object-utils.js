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
}
