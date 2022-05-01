import img from "../assets/logo.svg";
import styled from "styled-components";
import { width } from "@mui/system";

export default function Logo({ width }) {
    return (
        <LogoRepo width={width} src={img} />
    )
}

const LogoRepo = styled.img`
    width: ${props => props.width ? width : '60%'};
    margin: 0 auto 40px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    box-sizing: border-box;
`