export const classStr = (classObject) => Object.keys(classObject).reduce( (r,c) => classObject[c] ? r += ' '+c : r , '' );

