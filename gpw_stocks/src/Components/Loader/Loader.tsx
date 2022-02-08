import styled, { keyframes } from "styled-components";
import useShowHide from "../../CustomHooks/useShowHide";


const Container = styled.div<{ isDisplay: boolean, isShown: boolean }>`
  position:relative;
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

const Bounce = keyframes`
     0% {
          top: 50px;
          height: 12px;
          border-radius: 80px 80px 30px 30px;
          transform: scaleX(2);
        };
        35% {
          height: 50px;
          border-radius: 50%;
          transform: scaleX(1);
        };
        100% {
          top: 0;
        };
`

const Bounceball = styled.div`
  position: relative;
  display: inline-block;
  height: 100px;
  width: 80px;

  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transform-origin: 50%;
    animation: ${Bounce} 0.8s alternate infinite ease;
    color: ${({ theme }) => theme.colors.fontColor};
    background-color:${({ theme }) => theme.colors.bounceBallBackground};
  }
`


const Text = styled.div`
    font-weight: 700px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.fontColor};
`




const Loader = ({ displayLoader, loaderText }: { displayLoader: boolean, loaderText: string }) => {

    const { isDisplay, isShown, } = useShowHide(displayLoader)

    return (
        <Container isDisplay={isDisplay} isShown={isShown}>
            <Bounceball></Bounceball>
            <Text>{loaderText}</Text>
        </Container >
    )
}

export default Loader