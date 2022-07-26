//import react router dom
import { Switch, Route } from "react-router-dom";

//import component private routes
import PrivateRoute from "./PrivateRoutes";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from "../pages/admin/Login";

//import view admin Dashboard
import Dashboard from "../pages/admin/dashboard/Index";

// import view admin categories
import CategoriesIndex from "../pages/admin/categories/Index";
import CategoriesCreate from "../pages/admin/categories/Create";
import CategoryEdit from "../pages/admin/categories/Edit";
import PlacesIndex from "../pages/admin/places/Index";
import PlaceCreate from "../pages/admin/places/Create";
import PlaceEdit from "../pages/admin/places/Edit";
import SliderIndex from "../pages/admin/sliders/Index";
import SliderCreate from "../pages/admin/sliders/Create";
import UsersIndex from "../pages/admin/users/Index";
import UserCreate from "../pages/admin/users/Create";
import UserEdit from "../pages/admin/users/Edit";

// import web
import Home from "../pages/web/home/Index";
import WebCategoryShow from "../pages/web/categories/Show";
import WebPlacesIndex from "../pages/web/places/Index";
import WebPlacesShow from "../pages/web/places/Show";
import WebPlaceDirection from "../pages/web/places/Direction";
import WebMapsIndex from "../pages/web/maps/Index";
import WebSearch from "../pages/web/search/Index";

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

      <PrivateRoute exact path="/admin/places">
        <PlacesIndex />
      </PrivateRoute>

      <PrivateRoute exact path="/admin/places/create">
        <PlaceCreate />
      </PrivateRoute>

      <PrivateRoute exact path="/admin/places/edit/:id">
        <PlaceEdit />
      </PrivateRoute>

      <PrivateRoute exact path="/admin/sliders">
        <SliderIndex />
      </PrivateRoute>

      <PrivateRoute exact path="/admin/sliders/create">
        <SliderCreate />
      </PrivateRoute>

      <PrivateRoute exact path="/admin/users">
        <UsersIndex />
      </PrivateRoute>

      <PrivateRoute exact path="/admin/users/create">
        <UserCreate />
      </PrivateRoute>

      <PrivateRoute exact path="/admin/users/edit/:id">
        <UserEdit />
      </PrivateRoute>

      {/* route web */}
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/category/:slug">
        <WebCategoryShow />
      </Route>

      <Route exact path="/places">
        <WebPlacesIndex />
      </Route>

      <Route exact path="/places/:slug">
        <WebPlacesShow />
      </Route>

      <Route exact path="/places/:slug/direction">
        <WebPlaceDirection />
      </Route>

      <Route exact path="/places/:slug/direction">
        <WebPlaceDirection />
      </Route>

      <Route exact path="/maps">
        <WebMapsIndex />
      </Route>

      <Route exact path="/search">
        <WebSearch />
      </Route>

    </Switch>
  );
}

export default Routes;
