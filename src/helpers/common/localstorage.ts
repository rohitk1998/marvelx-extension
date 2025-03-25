


const getPrivateKeyLocalStorage = () => {
    const storedArray: any = localStorage.getItem("privatekey") ?? []
    const retrievedArr = JSON.parse(storedArray);
    const array:Array<any> = Object.values(retrievedArr);
    const uint8Array = new Uint8Array(array);
    return uint8Array;
}

export {
    getPrivateKeyLocalStorage
}