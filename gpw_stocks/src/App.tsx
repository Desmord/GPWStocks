import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalTheme } from './GlobalTheme'
import {
    STOCKS_NAMES,
    ADRESSES,
} from './Utilities'

import Info from "./Components/Info/Info";
import Loader from "./Components/Loader/Loader";
import Main from "./Components/Main/Main";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display:grid;
  place-content:center;
  background-color: ${({ theme }) => theme.colors.appBackground};
  color: ${({ theme }) => theme.colors.fontColor};
`

const App = () => {
    const [displayLoader, setDisplayLoader] = useState(true);
    const [displayMain, setDisplayMain] = useState(false);
    const [displayInfo, setDisplayInfo] = useState(false);
    const [infoText, setInfoText] = useState(`Bład podczas połączenia spróbuj ponownie.`);
    const [loaderText, setLoaderText] = useState(`Wczytywanie 0/23...`);
    const [loaderState, setLodaerState] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [wig20, setWig20] = useState({
        value: 0,
        percentageChange: 0,
        changeValue: 0,
    });
    const [wig40, setWig40] = useState({
        value: 0,
        percentageChange: 0,
        changeValue: 0,
    });
    const [wig80, setWig80] = useState({
        value: 0,
        percentageChange: 0,
        changeValue: 0,
    });
    const [wig20Stocks, setWig20Stocks] = useState<any>([]);

    const getWig = async (adress: string, setWigStatus: Function) => {

        try {

            const rawResponse = await fetch(adress, { method: 'GET', })
            const response = await rawResponse.json();

            setWigStatus({
                value: parseFloat(response.value.replace(`,`, `.`)),
                percentageChange: parseFloat(response.percentageChange.replace(`,`, `.`)),
                changeValue: parseFloat(response.changeValue.replace(`,`, `.`)),
            })
            setLodaerState((prev: number) => prev + 1)

        } catch (err) {
            setDisplayLoader(false)
            setInfoText(`${err}`);
            setDisplayInfo(true);
        }
    }


    const getStock = async (stockName: string) => {

        try {
            const rawResponse = await fetch(ADRESSES.SERVER_URL_GET_STOCK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ shortcut: stockName })
            })
            const response = await rawResponse.json();
            return response

        } catch (err) {
            setDisplayLoader(false)
            setInfoText(`${err}`);
            setDisplayInfo(true);
            return 0
        }

    }


    const getWig20Stocks = async () => {
        let stocks = [];

        for (const stock in STOCKS_NAMES) {
            const data = await getStock(stock)

            if (data) {
                const newObject = {
                    name: stock,
                    value: parseFloat(data.value.replace(`,`, `.`)),
                    percentageChange: parseFloat(data.percentageChange.replace(`,`, `.`)),
                    changeValue: parseFloat(data.changeValue.replace(`,`, `.`)),
                }
                stocks.push(newObject)
                setLodaerState((prev: number) => prev + 1)
            }
        }

        setWig20Stocks(stocks)
        setIsLoaded(true)

    }

    const setTestStocksData = () => {
        let stocks = [];

        for (let i = 1; i < 20; i++) {
            stocks.push({
                name: i,
                value: i,
                percentageChange: i,
                changeValue: i,
            })
        }
        setWig20Stocks(stocks)
        setIsLoaded(true)
    }

    useEffect(() => {
        // setLodaerState(0)
        // getWig(ADRESSES.SERVER_URL_GET_WIG_20, setWig20);
        // getWig(ADRESSES.SERVER_URL_GET_WIG_40, setWig40);
        // getWig(ADRESSES.SERVER_URL_GET_WIG_80, setWig80);
        // getWig20Stocks()
        // test Data
        setTestStocksData()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setLoaderText(() => `Wczytywanie ${loaderState}/23...`)
    }, [loaderState])

    useEffect(() => {
        if (isLoaded) {
            setDisplayLoader(false)
            setDisplayMain(true)
        }
    }, [isLoaded])

    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container>
                <Loader displayLoader={displayLoader} loaderText={loaderText} />
                <Info displayInfo={displayInfo} infoText={infoText} />
                <Main
                    displayMain={displayMain}
                    wig20={wig20}
                    wig40={wig40}
                    wig80={wig80}
                    stocks={wig20Stocks} />
            </Container>
        </ThemeProvider>
    )
}


export default App;