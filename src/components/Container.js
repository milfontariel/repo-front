import styled from "styled-components";

export default function Container({ children }) {
    return (
        <Background>
            {children}
        </Background>
    )
}

const Background = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #fff;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`