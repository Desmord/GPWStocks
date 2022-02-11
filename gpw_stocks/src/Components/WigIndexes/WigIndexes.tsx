import styled from "styled-components";

const Container = styled.div`
    display:flex
    flex-wrap: wrap;
    justify-content: center;
    width: clamp(250px,50vw,900px);
`

const IndexContainer = styled.div`
    flex: 1 1 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:5px;
    min-height: 60px;
    margin:10px;
    background-color: hsla(0,0%,70%,0.05);
`

const IndexTitle = styled.div`
    font-weight: 700;
    margin-bottom: 10px;
`

const ValueContainer = styled.div`
    display:flex;
    justify-content: center;
    /* justify-content: space-between; */
    align-items:center;
    width: 90%;
    font-size:0.8rem;
`

const IndexValue = styled.div<{ isPositive: boolean }>`

    ${({ isPositive }) => isPositive ?
        `
            color: hsla(100,40%,50%,0.9);
        ` : `
            color: hsla(350,60%,50%,0.9);
        `}

`

const WigIndexes = ({
    wig20,
    wig40,
    wig80,
}: {
    wig20: any,
    wig40: any,
    wig80: any,
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
            <IndexContainer>
                <IndexTitle>Wig20</IndexTitle>
                <div>{wig20.value}</div>
                <IndexValue isPositive={isValuePositive(wig20.changeValue)}>{wig20.changeValue}</IndexValue>
                <IndexValue isPositive={isValuePositive(wig20.percentageChange)}>{wig20.percentageChange}%</IndexValue>
            </IndexContainer>
            <IndexContainer>
                <IndexTitle>Wig40</IndexTitle>
                <div>{wig40.value}</div>
                <IndexValue isPositive={isValuePositive(wig40.changeValue)}>{wig40.changeValue}</IndexValue>
                <IndexValue isPositive={isValuePositive(wig40.percentageChange)}>{wig40.percentageChange}%</IndexValue>
            </IndexContainer>
            <IndexContainer>
                <IndexTitle>Wig20</IndexTitle>
                <div>{wig80.value}</div>
                <IndexValue isPositive={isValuePositive(wig80.changeValue)}>{wig80.changeValue}</IndexValue>
                <IndexValue isPositive={isValuePositive(wig80.percentageChange)}>{wig80.percentageChange}%</IndexValue>
            </IndexContainer>
        </Container>

    )
}


export default WigIndexes;