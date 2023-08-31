export const validateObject = (obj: unknown, key?: string): boolean => {
  // Приводим obj к типу Record<string, any>, который означает объект с произвольными свойствами
  const objAsRecord = obj as Record<string, any>;
  if (!key) {
    let isValid = false;
    for (const objKey in objAsRecord) {
      if (objAsRecord.hasOwnProperty(objKey)) {
        if (objAsRecord[objKey] !== null && objAsRecord[objKey] !== undefined) {
          isValid = true;
          break;
        }
      }
    }
    return isValid;
  } else {
    if (objAsRecord[key] !== null && objAsRecord[key] !== undefined) {
      if (typeof objAsRecord[key] === "object" && !Array.isArray(objAsRecord[key])) {
        for (const nestedKey in objAsRecord[key]) {
          if (objAsRecord[key].hasOwnProperty(nestedKey)) {
            if (
                objAsRecord[key][nestedKey] !== null &&
                objAsRecord[key][nestedKey] !== undefined
            ) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    return false;
  }
};
