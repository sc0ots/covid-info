import React, { Component } from "react";
import classNames from 'classnames'
import Logo from "./Logo"
import ChartIcon from "../../flaticon/chart.svg"
import WorldIcon from "../../flaticon/world.svg"
import HeartIcon from "../../flaticon/heart.svg"
import AdminIcon from "../../flaticon/admin.svg"
import MedicalIcon from "../../flaticon/medical.svg"
import UserIcon from "../../flaticon/user.svg"
import QuarantineIcon from "../../flaticon/quarantine.svg"
import TravelIcon from "../../flaticon/travel.svg"
import PcrTestIcon from "../../flaticon/pcrtest.svg"









import {
    Link, Route
} from "react-router-dom";
import "../../css/sidebar.css"

import UserProfile from "../../img/userMale.svg"
import { Redirect } from "react-router";



const sidebarMenus = [
    {
        label: "Admin",
        to: "/showadmin",
        activeOnlyWhenExact: true,
        icon: AdminIcon
    },
    {
        label: "Medical Staff",
        to: "/showmedicalstaff",
        activeOnlyWhenExact: true,
        icon: MedicalIcon
    },
    {
        label: "Chart",
        to: "/showflowchart",
        activeOnlyWhenExact: true,
        icon: ChartIcon
    },
    {
        label: "Covid World",
        to: "/showcovidworld",
        activeOnlyWhenExact: true,
        icon: WorldIcon
    },
    {
        label: "User",
        to: "/showuser",
        activeOnlyWhenExact: true,
        icon: UserIcon
    },
    {
        label: "User F0",
        to: "/showuserf0",
        activeOnlyWhenExact: true,
        icon: UserIcon
    },
    {
        label: "User F1",
        to: "/showuserf1",
        activeOnlyWhenExact: true,
        icon: UserIcon
    },
    {
        label: "Health Daily",
        to: "/showhealthdaily",
        activeOnlyWhenExact: true,
        icon: HeartIcon
    },
    {
        label: "Health Declaration",
        to: "/showhealthdcl",
        activeOnlyWhenExact: true,
        icon: HeartIcon
    },
    {
        label: "Treatment Area",
        to: "/showtreatment",
        activeOnlyWhenExact: true,
        icon: QuarantineIcon
    },
    {
        label: "Quarantine Area",
        to: "/showquarantine",
        activeOnlyWhenExact: true,
        icon: QuarantineIcon
    },
    {
        label: "Travel History",
        to: "/showtravelhistory",
        activeOnlyWhenExact: true,
        icon: TravelIcon
    },

    {
        label: "Pcr Test",
        to: "/showallpcrtest",
        activeOnlyWhenExact: true,
        icon: PcrTestIcon
    }
];
const SideLink = ({ label, to, activeOnlyWhenExact, icon }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            var active = match ? "link-active" : "";
            return (
                <li className={active}>
                    <Link to={to} onClick={()=>{document.title = `Covid info - ${label}`}}>
                        <img src={icon}></img>
                        <span className="links_name">{label}</span>
                    </Link>
                    <span className="tooltip">{label}</span>
                </li>
            )

        }} />
    )

}


class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            active: true
        }
        this.handlerClickToggle = this.handlerClickToggle.bind(this);
    }
    handlerClickToggle() {
        this.setState({
            active: !this.state.active
        })
    };


    ShowSidebarMenus = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <SideLink key={index} label={menu.label} to={menu.to} activeOnlyWhenExact={menu.activeOnlyWhenExact} icon={menu.icon} />
                )
            })
        }
        return result;
    }
    logOut = () => {
        localStorage.removeItem("user");
        window.location.reload();
        return <Redirect to="/showlogin" />

    }
    render() {
        const isLogged = JSON.parse(localStorage.getItem("user"))
        let name = "";
        if (isLogged !== null) {
            name = isLogged.username
        }
        return (
            <div className={classNames('sidebar', { "active": this.state.active == true })}>
                <Logo handlerOnclick={this.handlerClickToggle} />
                <ul className="side-list">
                    {this.ShowSidebarMenus(sidebarMenus)}
                </ul>
                <div className="profile_content">
                    <div className="profile">
                        <div className={classNames("profile_details", { "block": this.state.active == false })}>
                            <img src={UserProfile} className="user_img" />
                            <div className="user_name">{name}</div>
                        </div>
                        <i className='bx bx-log-out' onClick={this.logOut}></i>
                    </div>
                </div>
            </div>
        )
    }
}
export default SideBar;