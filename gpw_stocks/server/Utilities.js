

const getStockData = (pageHTMLText) => {
    const searchIndex = pageHTMLText.search(`profilLast`)
    const isTextPartFound = searchIndex < 0 ? true : false;

    if (isTextPartFound) return false

    const searchText = pageHTMLText.substring(searchIndex, searchIndex + 300);
    const searchRegex = /[0-9,]+/gim;
    const searchValues = searchText.match(searchRegex)
    const isValuesNotFound = searchValues.length === 3 ? false : true;

    if (isValuesNotFound) return false

    const stockData = {
        value: searchValues[0],
        percentageChange: searchValues[1],
        changeValue: searchValues[2],
    }

    return stockData
}

module.exports = {
    getStockData
}