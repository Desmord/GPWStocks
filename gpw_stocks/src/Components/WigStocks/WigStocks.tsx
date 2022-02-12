import styled from "styled-components";

const Container = styled.div`
    display:grid;
    grid-template-columns: 1fr;
    margin-top: 10px;
    padding-top:10px;
    border-top: 1px solid rgba(0,0,0,0.1);

`

const StockContainer = styled.div`
    display:flex;
    gap:5px;
    justify-content: space-between;
    align-items: center;
    width: max(320px,80%);
    margin: 0 auto;
    margin-top:8px;
    border-top: 1px solid rgba(0,0,0,0.05);
    font-size: 15px;

    &:nth-of-type(1){
        border:none;
    }

    @media all and (max-width: 580px){
        font-size: 12px;
    }

    @media all and (max-width: 480px){
        font-size: 10px;
    }

    @media all and (max-width: 420px){
        font-size: 9px;
    }

`

const Cell = styled.div`
    display:flex;
    justify-content: center;
    width: max(80px, 25%);
`

const ChangeColor = styled.div<{ isPositive: boolean }>`
    display:flex;
    justify-content: center;
    width: max(75px, 25%);

    ${({ isPositive }) => isPositive ?
        `
        color: hsla(100,40%,50%,0.9);
    ` : `
        color: hsla(350,60%,50%,0.9);
    `}

`

const WigStocks = ({
    stocks
}: {
    stocks: any[]
}) => {

    const isValuePositive = (value: number): boolean => {

        if (`${value}`.substring(0, 1) === `-`) {
            return false
        } else {
            return true
        }

    }

    return (

        <Container>
            {stocks.map((stock, index) => (
                <StockContainer key={index}>
                    <Cell>{stock.name}</Cell>
                    <Cell>{stock.value}</Cell>
                    <ChangeColor isPositive={isValuePositive(stock.changeValue)}>{stock.changeValue}</ChangeColor>
                    <ChangeColor isPositive={isValuePositive(stock.changeValue)}>{stock.percentageChange}</ChangeColor>
                </StockContainer>
            ))}
        </Container>

    )
}


export default WigStocks;

// name: i,
// value: i,
// percentageChange: i,
// changeValue: i,