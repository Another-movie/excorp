export const isEqualObjs = (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2)

export const getMostRangeDifference = (milliseconds) => {
    const days = (milliseconds / (1000 * 3600 * 24)).toFixed(0)
    const month = (milliseconds / (1000 * 3600 * 24 * 30)).toFixed(0)
    const years = (milliseconds / (1000 * 3600 * 24 * 30 * 12)).toFixed(0)

    return years > 0
        ? [years, 'years']
        : month > 0
        ? [month, 'month']
        : days > 0
        ? [days, 'days']
        : null
}
