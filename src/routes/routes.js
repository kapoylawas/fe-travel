//import react router dom
import { Switch, Route } from "react-router-dom";

//import component private routes
import PrivateRoute from "./PrivateRoutes";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from '../pages/admin/Login';

//import view admin Dashboard
import Dashboard from '../pages/admin/dashboard/Index';

// import view admin categories
import CategoriesIndex from '../pages/admin/categories/Index';
import CategoriesCreate from "../pages/admin/categories/Create";
import CategoryEdit from "../pages/admin/categories/Edit";

function Routes() {
    return (
        <Switch>

            {/* route "/adminlogin" */}
            <Route exact path="/admin/login">
                <Login /> 
            </Route>

            {/* private route "/admin/dashboard" */}
            <PrivateRoute exact path="/admin/dashboard">
                <Dashboard /> 
            </PrivateRoute>

            {/* private route "/admin/dashboard" */}
            <PrivateRoute exact path="/admin/categories">
                <CategoriesIndex /> 
            </PrivateRoute>

            <PrivateRoute exact path="/admin/categories/create">
                <CategoriesCreate /> 
            </PrivateRoute>

            <PrivateRoute exact path="/admin/categories/edit/:id">
                <CategoryEdit /> 
            </PrivateRoute>

        </Switch>
    )
}

export default Routes