import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import HomePage from "./pages/HomePage";
import TripPlanner from "./pages/TripPlanner";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ActivityList from "./components/ActivityList";
import EditActivity from "./components/EditActivity";
import ActivityDetail from "./components/ActivityDetail";
import TripDetail from "./components/TripDetail";
import AddTrip from "./components/AddTrip";

const App = () => {
  const [initialCoords, setInitialCoords] = useState({
    // Fallback coordinates (Kouvola) if geolocation fails:
    lat: 60.867872,
    lon: 26.704129,
  });
  const [error, setError] = useState(null);

  // Get coordinates for user's current location:
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInitialCoords({ lat: latitude, lon: longitude });
        },
        (err) => {
          setError("Failed to retrieve user location");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Log geolocation error
  useEffect(() => {
    if (error) {
      console.error("Geolocation error:", error);
    }
  }, [error]);

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
          element: <TripPlanner initialCoords={initialCoords} />,
        },
        { path: "/contact", element: <ContactPage /> },
        {
          path: "/login",
          element: <LoginPage />,
        },
        { path: "/addTrip", element: <AddTrip /> },
        { path: "/trips/:id", element: <TripDetail /> },
        { path: "/activities", element: <ActivityList /> },
        { path: "/editActivity/:id", element: <EditActivity /> },
        { path: "/activities/:id", element: <ActivityDetail /> },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
