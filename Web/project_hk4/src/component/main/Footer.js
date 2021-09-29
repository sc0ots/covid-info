import React from "react";
import styled from "styled-components"

const FooterContent = styled.div`
 position: fixed;
 bottom: 0;
 left: 50%;
 
`
function Footer(){
    return(
        <FooterContent>
            <div>Make by Hoang Giang Chuan @2021</div>
        </FooterContent>
    )
}
export default Footer;