import styled, { ThemeProvider } from "styled-components";
import { GlobalTheme } from './GlobalTheme'

const Container = styled.div`

`

const App = () => {


    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container>
                app
            </Container>
        </ThemeProvider>
    )
}


export default App;