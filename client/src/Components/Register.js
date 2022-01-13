import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/appContext";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "../styles/login.css";
function Register() {
  const storedUser = localStorage.getItem("user"),
    storedToken = localStorage.getItem("token");
  const Navigate = useNavigate();
  const [member, setMember] = useState(true);
  const [message, setmessge] = useState(false);
  const { Axios, loggingIn, getToken, localToken } = GlobalContext();

  const registerInitialValues = {
    name: "",
    age: "",
    city: "",
    email: "",
    password: "",
  };
  const RegSchema = {
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    city: Yup.string().required(),
    age: Yup.number().required(),
    password: Yup.string().required(),
  };
  const memberInitialValues = {
    email: "",
    password: "",
  };
  const memberSchema = {
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  };
  const RegisterionToggle = () => {
    setMember(!member);
  };
  const handleSubmit = async (values) => {
    try {
      if (member) {
        const { data } = await Axios.post("/users/login", values);
        localToken(data);
        getToken(data);
        loggingIn();
      } else {
        const { data } = await Axios.post("/users", values);
        localToken(data);
        getToken(data);
        loggingIn();
      }
    } catch (e) {
      setmessge(true);
      setTimeout(() => {
        setmessge(false);
      }, 3000);
    }
  };
  const Registerition = ["name", "city", "age", "email", "password"];
  const memberForm = ["email", "password"];
  useEffect(() => {
    if (storedUser && storedToken) {
      Navigate("/", { replace: true });
    }
  }, [storedUser, storedToken, Navigate]);

  return (
    <>
      <div className="login">
        <h1>
          <span>Task</span> Tracker
        </h1>
        {!member ? <h2>Register</h2> : <h2>Login</h2>}
        <Formik
          initialValues={{ ...registerInitialValues }}
          validationSchema={Yup.object({ ...RegSchema })}
          onSubmit={handleSubmit}
        >
          <Form>
            {!member && (
              <>
                {Registerition.map((field) => {
                  return (
                    <div key={field}>
                      <label htmlFor={field}>
                        {`${field.charAt(0).toUpperCase()}${field.slice(1)}`}{" "}
                      </label>
                      <Field
                        name={field}
                        type={field === "age" ? "number" : field}
                        id={field}
                      />
                      <ErrorMessage name={field}>
                        {() => (
                          <div className="error">{field} can't be empty</div>
                        )}
                      </ErrorMessage>
                    </div>
                  );
                })}

                <button type="submit">Submit</button>
              </>
            )}
          </Form>
        </Formik>
        <Formik
          initialValues={{ ...memberInitialValues }}
          validationSchema={Yup.object({ ...memberSchema })}
          onSubmit={handleSubmit}
        >
          <Form>
            {member && (
              <>
                {memberForm.map((field) => {
                  return (
                    <div key={field}>
                      <label htmlFor={field}>
                        {`${field.charAt(0).toUpperCase()}${field.slice(1)}`}{" "}
                      </label>
                      <Field name={field} type={field} id={field} />
                      <ErrorMessage name={field}>
                        {() => (
                          <div className="error">{field} can't be empty</div>
                        )}
                      </ErrorMessage>
                    </div>
                  );
                })}
                <button type="submit">Submit</button>
              </>
            )}
          </Form>
        </Formik>
        {message && <div className="error">Wrong Email Or Password</div>}

        {!member ? (
          <p>
            {" "}
            Already a Member <span onClick={RegisterionToggle}>Login</span>
          </p>
        ) : (
          <p>
            Not a member yet? <span onClick={RegisterionToggle}>Register</span>
          </p>
        )}
      </div>
    </>
  );
}

export default Register;
