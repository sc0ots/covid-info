import React, { Component } from "react";
import NavBar from "../../component/main/NavBar";
import Footer from "../../component/main/Footer";
import NotFound from "../../component/main/NotFound";
import routes from "../../routes"
import { Redirect } from "react-router";

import {
    Switch,
    Route,
    } from "react-router-dom";
import styled from "styled-components"
import { Header } from 'semantic-ui-react'
import "../../css/wrapper.css"


const WidthWrapper = styled.div`
 width: 100%;
 padding-top: 30px;
`
const WidthContent = styled.div`
 max-width: 1600px;
 margin: 0 auto;
`
class Wrapper extends Component {
    showContentWeb = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                const isLogged = localStorage.getItem("user");
                if(isLogged !== null){
                    return (
                        <Route key={index} path={route.path} exact={route.exact} component={route.main} />
                    )
                }else{
                    return <Redirect to="/showlogin"/>
                }
            })
        }
        return result;
    }

    render() {
        return (
            <div className="wrapper">
                <NavBar />

                <WidthWrapper>
                    <WidthContent>
                        {/* <React.Fragment >
                            <Breadcrumb size="big" >
                                <Breadcrumb.Section link>Home</Breadcrumb.Section>
                                <Breadcrumb.Divider icon='right chevron' />
                                <Breadcrumb.Section link>Registration</Breadcrumb.Section>
                                <Breadcrumb.Divider icon='right chevron' />
                                <Breadcrumb.Section active>Personal Information</Breadcrumb.Section>
                            </Breadcrumb>
                            <Divider hidden />
                        </React.Fragment> */}
                        <Switch>
                            
                            {this.showContentWeb(routes)}
                            <NotFound />
                        </Switch>
                    </WidthContent>
                </WidthWrapper>
                {/* <Footer /> */}
            </div>
        )
    }
}
export default Wrapper;
