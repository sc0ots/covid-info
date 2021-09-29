
import React from "react";
import ShowAdmin from "./component/layout/Show/ShowAdmin";
import ShowMedicalStaff from "./component/layout/Show/ShowMedicalStaff";
import ShowFlowChart from "./component/layout/Show/ShowFlowChart";
import ShowUser from "./component/layout/Show/ShowUser";
import ShowUserF0 from "./component/layout/Show/ShowUserF0";
import ShowUserF1 from "./component/layout/Show/ShowUserF1";
import ShowQuarantine from "./component/layout/Show/ShowQuarantine";
import ShowPcrTest from "./component/layout/Show/ShowPcrTest";
import ShowTreatment from "./component/layout/Show/ShowTreatment";
import ShowTravelHistory from "./component/layout/Show/ShowTravelHistory";
import ShowAllPcrTest from "./component/layout/Show/ShowAllPcrTest";
import ShowHealthDcl from "./component/layout/Show/ShowHealthDcl";
import ShowHealthDaily from "./component/layout/Show/ShowHealthDaily";
import CreateAdmin from "./component/layout/Create/CreateAdmin";
import CreateUser from "./component/layout/Create/CreateUser";
import CreateUserF0 from "./component/layout/Create/CreateUserF0";
import CreateUserF1 from "./component/layout/Create/CreateUserF1";
import CreateTreatment from "./component/layout/Create/CreateTreatment";
import CreateQuarantine from "./component/layout/Create/CreateQuarantine";
import CreateMedicalStaff from "./component/layout/Create/CreateMedicalStaff";
import CreatePcrTest from "./component/layout/Create/CreatePcrTest";
import DetailMedicalStaff from "./component/layout/Details/DetailMedicalStaff";
import DetailUser from "./component/layout/Details/DetailUser";
import DetailUserF0 from "./component/layout/Details/DetailUserF0";
import DetailUserF1 from "./component/layout/Details/DetailUserF1";
import DetailQuarantine from "./component/layout/Details/DetailQuarantine";
import DetailTreatment from "./component/layout/Details/DetailTreatment";
import DetailPcrTest from "./component/layout/Details/DetailPcrTest";
import DetailTravelHistory from "./component/layout/Details/DetailTravelHistory";
import DetailHealthDcl from "./component/layout/Details/DetailHealthDcl";
import DetailHealthDaily from "./component/layout/Details/DetailHealthDaily";
import UpdateMedicalStaff from "./component/layout/Update/UpdateMedicalStaff";
import UpdateUser from "./component/layout/Update/UpdateUser";
import UpdateUserF0 from "./component/layout/Update/UpdateUserF0";
import UpdateUserF1 from "./component/layout/Update/UpdateUserF1";
import UpdateTreatment from "./component/layout/Update/UpdateTreatment";
import UpdateQuarantine from "./component/layout/Update/UpdateQuarantine";
import FormDeleteUserF0 from "./component/layout/Delete/FormDeleteUserF0";
import ReportUser from "./component/layout/Report/ReportUser"
import ReportF0 from "./component/layout/Report/ReportF0"
import ReportF1 from "./component/layout/Report/ReportF1"
import ReportHealthDaily from "./component/layout/Report/ReportHealthDaily"
import ReportHealthDcl from "./component/layout/Report/ReportHealthDcl"

import Vaccine1 from "./component/layout/Vaccine/Vaccine1"
import Vaccine2 from "./component/layout/Vaccine/Vaccine2"

import MapWord from "./component/layout/Mapword/MapWorld"












const routes = [
    {
        path: "/showadmin",
        exact: true,
        main: () => <ShowAdmin />
    },

    {
        path: "/showmedicalstaff",
        exact: true,
        main: ({match}) => <ShowMedicalStaff match={match} />
    },
    {
        path: "/showflowchart",
        exact: true,
        main: () => <ShowFlowChart />
    },
    {
        path: "/showuser",
        exact: true,
        main: ({match}) => <ShowUser match={match} />
    },
    {
        path: "/showuserf0",
        exact: true,
        main: ({match}) => <ShowUserF0 match={match}/>
    },
    {
        path: "/showuserf1",
        exact: true,
        main: ({match}) => <ShowUserF1 match={match}/>
    },
    {
        path: "/showtravelhistory",
        exact: true,
        main: ({match}) => <ShowTravelHistory match={match}/>
    },
    {
        path: "/showquarantine",
        exact: true,
        main: () => <ShowQuarantine />
    },
    {
        path: "/showtreatment",
        exact: true,
        main: () => <ShowTreatment />
    },
    {
        path: "/showpcrbyuser/:id",
        exact: true,
        main: ({match}) => <ShowPcrTest match={match} />
    },
    {
        path: "/showallpcrtest",
        exact: true,
        main: ({match}) => <ShowAllPcrTest match={match} />
    },
    {
        path: "/showhealthdcl",
        exact: true,
        main: ({match}) => <ShowHealthDcl match={match} />
    },
    {
        path: "/showhealthdaily",
        exact: true,
        main: ({match}) => <ShowHealthDaily match={match} />
    },
    {
        path: "/showmedicalstaff/:id",
        exact: true,
        main: ({match}) => <DetailMedicalStaff match={match}/>
    },
    {
        path: "/showuser/:id",
        exact: true,
        main: ({match}) => <DetailUser match={match}/>
    },
    {
        path: "/showuserf0/:id",
        exact: true,
        main: ({match}) => <DetailUserF0 match={match}/>
    },
    {
        path: "/showuserf1/:id",
        exact: true,
        main: ({match}) => <DetailUserF1 match={match}/>
    },
    {
        path: "/detailquarantine/:id",
        exact: true,
        main: ({match}) => <DetailQuarantine match={match}/>
    },
    {
        path: "/detailtreatment/:id",
        exact: true,
        main: ({match}) => <DetailTreatment match={match}/>
    },
    {
        path: "/detailtravelhistory/:id",
        exact: true,
        main: ({match}) => <DetailTravelHistory  match={match}/>
    },
    {
        path: "/detailpcrtest/:id",
        exact: true,
        main: ({match}) => <DetailPcrTest  match={match}/>
    },
    {
        path: "/detailhealthdcl/:id",
        exact: true,
        main: ({match}) => <DetailHealthDcl  match={match}/>
    },
    
    {
        path: "/detailhealthdaily/:id",
        exact: true,
        main: ({match}) => <DetailHealthDaily  match={match}/>
    },
    {
        path: "/createadmin",
        exact: true,
        main: () => <CreateAdmin />
    },
    {
        path: "/createmedicalstaff",
        exact: true,
        main: () => <CreateMedicalStaff />
    },
    {
        path: "/createuser",
        exact: true,
        main: () => <CreateUser />
    },
    {
        path: "/createuserf0/:id",
        exact: true,
        main: ({match}) => <CreateUserF0 match={match}/>
    },
    {
        path: "/createuserf1/:id",
        exact: true,
        main: ({match}) => <CreateUserF1 match={match}/>
    },
    {
        path: "/createtreatment",
        exact: true,
        main: () => <CreateTreatment/>
    },
    {
        path: "/createquarantine",
        exact: true,
        main: () => <CreateQuarantine/>
    },
    {
        path: "/createpcr/:id",
        exact: true,
        main: ({match}) => <CreatePcrTest match={match}/>
    },
    {
        path: "/updatemedicalstaff/:id",
        exact: true,
        main: ({match}) => <UpdateMedicalStaff match={match}/>
    },
    {
        path: "/updateuser/:id",
        exact: true,
        main: ({match}) => <UpdateUser match={match}/>
    },
    {
        path: "/updateuserf0/:id",
        exact: true,
        main: ({match}) => <UpdateUserF0 match={match}/>
    },
    {
        path: "/updateuserf1/:id",
        exact: true,
        main: ({match}) => <UpdateUserF1 match={match}/>
    },
    {
        path: "/updatetreatment/:id",
        exact: true,
        main: ({match}) => <UpdateTreatment match={match}/>
    },
    {
        path: "/updatequarantine/:id",
        exact: true,
        main: ({match}) => <UpdateQuarantine match={match}/>
    },
    {
        path: "/createadmin",
        exact: true,
        main: () => <CreateAdmin />
    },
    {
        path: "/deleteuserf0/:id",
        exact: true,
        main: ({match}) => <FormDeleteUserF0 match={match}/>
    },
    {
        path: "/reportf0/:id",
        exact: true,
        main: ({match}) => <ReportF0 match={match}/>
    },
    {
        path: "/reportf1/:id",
        exact: true,
        main: ({match}) => <ReportF1 match={match}/>
    },
    {
        path: "/reporthealthdaily/:id",
        exact: true,
        main: ({match}) => <ReportHealthDaily match={match}/>
    },
    {
        path: "/reporthealthdcl/:id",
        exact: true,
        main: ({match}) => <ReportHealthDcl match={match}/>
    },
    {
        path: "/reportuser/:id",
        exact: true,
        main: ({match}) => <ReportUser match={match}/>
    },

    {
        path: "/vaccine1/:id",
        exact: true,
        main: ({match}) => <Vaccine1 match={match}/>
    },
    {
        path: "/vaccine2/:id",
        exact: true,
        main: ({match}) => <Vaccine2 match={match}/>
    },
    {
        path: "/showcovidworld",
        exact: true,
        main: () => <MapWord />
    },



]
export default routes