


const DotFormatAddress = (address: string) => {
    if (address) {
        return address.slice(0, 13) +
            '...' +
            address.slice(
                address.length - 10,
                address.length - 1
            )
    }
}

export {
    DotFormatAddress
}