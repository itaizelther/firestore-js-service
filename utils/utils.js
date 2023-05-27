/**
 * Firestore expects values in queries to be in their matching type.
 * For ex., numbers should be in integers.
 * This helper function converts all non-string valeus to their respective type,
 * using the JSON.parse utility.
 * If a given value is a string, it can't be converted (and should'nt) so it returned as it is.
 * @param {any} value - value to be converted.
 * @returns given value in its respective type.
 */
const parseQueryValue = (value) => {
  try {
    const parsed = JSON.parse(value);
    return parsed;
  } catch (SyntaxError) {
    return value;
  }
};

export { parseQueryValue };
