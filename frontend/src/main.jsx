import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Home from "./screens/Home";
import About from "./screens/About";
import Contact from "./screens/Contact";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Admin from "./screens/Admin";
import Vendor from "./screens/Vendor";
import User from "./screens/User";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import VendorPrivateRoute from "./components/VendorPrivateRoute";
import UserPrivateRoute from "./components/UserPrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="" element={<VendorPrivateRoute />}>
        <Route path="/vendor" element={<Vendor />} />
      </Route>
      <Route path="" element={<UserPrivateRoute />}>
        <Route path="/user" element={<User />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
