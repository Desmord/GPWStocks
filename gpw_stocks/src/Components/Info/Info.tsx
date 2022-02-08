import styled from "styled-components";
import useShowHide from "../../CustomHooks/useShowHide";


const Container = styled.div<{ isDisplay: boolean, isShown: boolean }>`
  position:relative;
  grid-column:2/4;
  grid-row:2/4;
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



const Info = ({ displayInfo, infoText }: { displayInfo: boolean, infoText: string }) => {

    const { isDisplay, isShown, } = useShowHide(displayInfo)

    return (
        <Container isDisplay={isDisplay} isShown={isShown}>
            {infoText}
        </Container >
    )
}

export default Info