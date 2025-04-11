function truncateWithoutRounding(num : number, decimals : number) {
    const factor = Math.pow(10, decimals);
    return Math.floor(num * factor) / factor;
  }

  export {
    truncateWithoutRounding
  }