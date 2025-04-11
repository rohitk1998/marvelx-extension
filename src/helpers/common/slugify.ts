function smartSlugify(str: string): string {
    const trimmed = str.trim();
    const words = trimmed.split(/\s+/); 
    
    if (words.length === 1) {
      return trimmed.toLowerCase();
    }
  
    return words.map(word => word.toLowerCase()).join('-'); 
  }
  export {
    smartSlugify
  }