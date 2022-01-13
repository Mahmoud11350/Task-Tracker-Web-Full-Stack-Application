import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./Components/ProtectedRoutes";
import Spiner from "./Components/spinner";
import { useEffect } from "react";
import { GlobalContext } from "./context/appContext";
const Landing = React.lazy(() => import("./Components/landing"));
const Dashboard = React.lazy(() => import("./Components/dashboard"));
const Register = React.lazy(() => import("./Components/Register"));
const Stats = React.lazy(() => import("./Components/stats"));
const NewTask = React.lazy(() => import("./Components/newTask"));
const AllTasks = React.lazy(() => import("./Components/alltasks"));
const Profile = React.lazy(() => import("./Components/profile"));
const NotFound = React.lazy(() => import("./Components/NotFound"));
function App() {
  const { newtask, loggedIn } = GlobalContext();

  useEffect(() => {
    if (loggedIn) {
      newtask();
    }
  }, [loggedIn]);
  return (
    <>
      <Suspense fallback={<Spiner />}>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<Navigate to="/stats" />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/all-tasks" element={<AllTasks />} />
              <Route path="/new-task" element={<NewTask />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />

          <Route path="/landing" element={<Landing />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
