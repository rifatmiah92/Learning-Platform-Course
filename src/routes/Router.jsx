// src/routes/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import SkillDetails from "../pages/SkillDetails/SkillDetails";
import MyProfile from "../pages/MyProfile/MyProfile";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import EnrollForm from "../pages/EnrollForm/EnrollForm"; // Keep this import
import EnrollmentConfirmation from "../pages/EnrollmentConfirmation/EnrollmentConfirmation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      {
        path: "/skill/:id",
        element: <SkillDetails />,
      },
      
      // NEW ROUTE FOR ENROLLMENT FORM
      {
        path: "/enroll/:id",
        element: <EnrollForm />,
      },
      {
        path: "/enroll-success/:id",
        element: <EnrollmentConfirmation></EnrollmentConfirmation>,
      },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
]);