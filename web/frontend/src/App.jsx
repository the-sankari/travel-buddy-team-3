// src/App.jsx
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import HomePage from "./pages/HomePage";
import TripPlanner from "./pages/TripPlanner";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const routes = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/planner",
          element: <TripPlanner />,
        },
        { path: "/contact", element: <ContactPage /> },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
