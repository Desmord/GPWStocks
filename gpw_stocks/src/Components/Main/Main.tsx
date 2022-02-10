import styled from "styled-components";
import useShowHide from "../../CustomHooks/useShowHide";

const Container = styled.div<{ isDisplay: boolean, isShown: boolean }>`
    position:relative;
    display:none;
    opacity: 0;
    transition:all 0.5s ease-in;

    ${({ isShown }) => isShown ? `
        opacity: 1;
    ` : `
        opacity: 0;
    `}

    ${({ isDisplay }) => isDisplay ? `
        display:flex;
        justify-content: center;
        align-items:center;
    ` : `
        display:none;
    `}
`

const Main = ({ displayMain }: { displayMain: boolean }) => {
    const { isDisplay, isShown, } = useShowHide(displayMain)

    return (
        <Container isDisplay={isDisplay} isShown={isShown}>
            main sdf
        </Container>
    )
}


export default Main;