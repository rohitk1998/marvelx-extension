const handleFormattedInput = (e: any) => {
  var validNumber = new RegExp(/^\d*\.?\d*$/);
  let value = e.target.value;
  let inputValue = '';

  if (value === "") {
    return 0;
  }

  else if(isNaN(value)) return 0;

  else {
    if(validNumber.test(value)){
      inputValue = value
    }
    else{
      return 0;
    }
  }
  return Number(inputValue);
};


  export {
    handleFormattedInput
  }