export function currencyStringToNumber(value: string | number){

    if(typeof value === 'number') return
    const sanitizedString = value.replace(/\./g, "").replace(",", ".");
    return Number(sanitizedString);
}
