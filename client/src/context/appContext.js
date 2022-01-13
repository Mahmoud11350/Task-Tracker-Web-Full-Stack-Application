import { useContext, createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState(false);
  const [tasks, setTasks] = useState(null);
  // const token = ;

  // Axios
  const Axios = axios.create({
    baseURL: process.env.React_App_API_URL,
  });
  // Request
  Axios.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response
  Axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const localToken = (data) => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };
  const removeLocalToken = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const getToken = (data) => {
    setToken(data.token);
  };
  //toggele Logged in
  const loggingOut = () => setLoggedIn(false);
  const loggingIn = () => setLoggedIn(true);
  //getTasks function
  const getTasks = async () => {
    const { data } = await Axios.get("/tasks");
    setTasks(data);
  };

  const newtask = () => getTasks();
  const searchTasks = (data) => {
    setTasks(data);
  };
  const completed = () => {
    if (tasks) {
      return tasks.tasks.filter((task) => task.taskProgress === true).length;
    }
  };
  const pending = () => {
    if (tasks) {
      return tasks.tasks.filter((task) => task.taskProgress === false).length;
    }
  };

  return (
    <AppContext.Provider
      value={{
        Axios,
        loggingIn,
        loggingOut,
        getToken,
        localToken,
        removeLocalToken,
        tasks,
        newtask,
        getTasks,
        searchTasks,
        completed,
        pending,
        loggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const GlobalContext = () => useContext(AppContext);
