export const checkAlphaNumeric = (inputtxt) => {
  var letterNumber = '/^[0-9a-zA-Z]+$/';
  if((inputtxt.match(letterNumber))) return true;
  else return false; 
}