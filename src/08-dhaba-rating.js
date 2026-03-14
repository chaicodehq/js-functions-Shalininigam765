/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  if (typeof field !== 'string' || typeof operator !== 'string') {
    return () => false;
  }
  
  return (obj) => {
    if (typeof obj !== 'object' || obj === null || !(field in obj)) {
      return false;
    }

    const objValue = obj[field];

    switch (operator) {
      case '>':
        return objValue > value;
      case '<':
        return objValue < value;
      case '>=':
        return objValue >= value;
      case '<=':
        return objValue <= value;
      case '===':
        return objValue === value;
      default:
        return false;
    }
  };
  
}

export function createSorter(field, order = "asc") {
  if (typeof field !== 'string' || (order !== 'asc' && order !== 'desc')) {
    return () => 0;
  }
  
  return (a, b) => {
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
      return 0;
    }

    const valueA = a[field];
    const valueB = b[field];

    if (valueA < valueB) {
      return order === 'asc' ? -1 : 1;
    } else if (valueA > valueB) {
      return order === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  };
}

export function createMapper(fields) {
  if (!Array.isArray(fields) || !fields.every(field => typeof field === 'string')) {
    return () => ({});
  }

  return (obj) => {
    const result = {};
    fields.forEach(field => {
      if (typeof obj === 'object' && obj !== null && field in obj) {
        result[field] = obj[field];
      }
    });
    return result;
  };
}

export function applyOperations(data, ...operations) {
  if (!Array.isArray(data)) {
    return [];
  }

  return operations.reduce((acc, op) => {
    if (typeof op === 'function') {
      return op(acc);
    }
    return acc;
  }, data);
  
}
