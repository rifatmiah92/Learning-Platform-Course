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
import EnrollForm from "../pages/EnrollForm/EnrollForm";
import EnrollmentConfirmation from "../pages/EnrollmentConfirmation/EnrollmentConfirmation";
import AllSkills from "../pages/AllSkills/AllSkills"; // ✅ New import for All Skills page

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Home Page
      { path: "/", element: <Home /> },

      // Authentication
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <ForgotPassword /> },

      // Skill Details
      {
        path: "/skill/:id",
        element: <SkillDetails />,
      },

      // ✅ New Route for showing all skills
      {
        path: "/skills",
        element: <AllSkills />,
      },

      // Enrollment Pages
      {
        path: "/enroll/:id",
        element: <EnrollForm />,
      },
      {
        path: "/enroll-success/:id",
        element: <EnrollmentConfirmation />,
      },

      // Profile (Protected)
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
