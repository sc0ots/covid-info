import React, {Component} from "react";
import LogoImg from "../../img/healthcare.png"

 class Logo extends Component{
    render(){
        const {handlerOnclick} = this.props;
        return(
            <div className="logo-content">
            <div className="logo">
                <img src={LogoImg} width={30} />
                <div className="logo_name" style={{marginLeft: "10px"}}>Covid Info</div>
            </div>
            <i className='bx bx-menu' id="btn" onClick={handlerOnclick}></i>
        </div>
        )
    }
}
export default Logo;