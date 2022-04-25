import styled from "styled-components";

export default function Title({ children }) {
    return (
        <TitlePage>
            {children}
        </TitlePage>
    )
}

const TitlePage = styled.p`
    color: rgba(0, 0, 0, 0.8);
    font-weight: bold;
    font-family: 'Lexend', sans-serif;
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
`