import img from "../assets/logo.svg";
import styled from "styled-components";

export default function Logo() {
    return (
        <LogoRepo src={img} />
    )
}

const LogoRepo = styled.img`
    width: 60%;
    margin: 0 auto 40px auto;
`