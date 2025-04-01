

function convertExponentialToDecimal(num:any, decimalPlaces:any = null) {
    if (!num || isNaN(num)) return "0"; // Handle invalid cases
  
    let str = num.toString(); // Convert number to string
  
    if (str.includes("e")) {
      let [base, exponent] = str.split("e"); // Split base and exponent
      base = parseFloat(base);
      exponent = parseInt(exponent);
  
      if (exponent < 0) {
        // Convert small numbers
        let decimalPlacesCount = Math.abs(exponent);
        str = base.toFixed(decimalPlacesCount);
      } else {
        // Convert large numbers
        str = base * Math.pow(10, exponent);
      }
    }
  
    // Optional: Fix decimal places if needed
    return decimalPlaces !== null ? parseFloat(str).toFixed(decimalPlaces) : str;
  }

  export {
    convertExponentialToDecimal
  }