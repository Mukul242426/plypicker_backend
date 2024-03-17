export const changedFields = (originalObj, newObj) => {
  const updatedObj = {};

  console.log("original obj is",originalObj)
  console.log("new obj is",newObj)

  for (const key in originalObj) {
    if (originalObj[key] != newObj[key]) {
      updatedObj[key] = newObj[key];
    }
  }
  return updatedObj;
};
