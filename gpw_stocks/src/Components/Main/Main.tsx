import styled from "styled-components";
import useShowHide from "../../CustomHooks/useShowHide";

import WigIndexes from "../WigIndexes/WigIndexes";
import WigStocks from "../WigStocks/WigStocks";

const Container = styled.div<{ isDisplay: boolean, isShown: boolean }>`
    position:relative;
    display:grid;
    opacity: 0;
    transition:all 0.5s ease-in;

    ${({ isShown }) => isShown ? `
        opacity: 1;
    ` : `
        opacity: 0;
    `}

    ${({ isDisplay }) => isDisplay ? `
        display:grid;
    ` : `
        display:none;
    `}
`

const Main = ({
    displayMain,
    wig20,
    wig40,
    wig80,
    stocks,
}: {
    displayMain: boolean,
    wig20: any,
    wig40: any,
    wig80: any,
    stocks: any[]
}) => {
    const { isDisplay, isShown, } = useShowHide(displayMain)

    return (
        <Container isDisplay={isDisplay} isShown={isShown}>
            <WigIndexes
                wig20={wig20}
                wig40={wig40}
                wig80={wig80} />
            <WigStocks stocks={stocks} />
        </Container>
    )
}


export default Main;