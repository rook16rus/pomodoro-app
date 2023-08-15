export const convertDigit = (digit: number): string | number => {
    return digit > 9 ? digit : '0' + digit
}