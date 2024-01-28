/**
 * Convert a camelCase string to sentence case.
 * @param {string} camelCaseString - Input camelCase string to be converted.
 * @returns {string} - Sentence case string.
 */
export function camelCaseToSentenceCase(camelCaseString) {
    return camelCaseString
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}
