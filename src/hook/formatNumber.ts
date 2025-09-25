export default function FormatNumber(number : number) {
    const formatNumber = new Intl.NumberFormat("en-US")
    const fromatedNumber = formatNumber.format(number)

    return fromatedNumber
}