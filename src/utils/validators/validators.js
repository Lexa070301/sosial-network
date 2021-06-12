export const requiredField = value => {
  if(value) {
    return undefined;
  }
  return "field is required";
}


export const maxLengthCreator = (maxLength) => value => {
  if(value.length < maxLength) {
    return undefined;
  }
  return "Max length is " + maxLength;
}
