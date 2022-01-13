import { Formik, Form, ErrorMessage, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { GlobalContext } from "../context/appContext";
import "../styles/new-task.css";
function NewTask() {
  const [created, setCreated] = useState(false);
  const initialValues = {
    taskTitle: "",
    taskDay: "",
    taskHours: "",
  };
  const schema = {
    taskTitle: Yup.string().required(),
    taskDay: Yup.string().required(),
    taskHours: Yup.number().required(),
  };
  const { Axios, newtask } = GlobalContext();
  const handleSubmit = async (values, { resetForm }) => {
    await Axios.post("/tasks", values);
    resetForm();
    setCreated(true);
    setTimeout(() => setCreated(false), 3000);
    newtask();
  };
  const newTask = ["taskTitle", "taskDay", "taskHours"];
  return (
    <div className="newtask">
      <h1>Add New Task</h1>
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={Yup.object({ ...schema })}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            {newTask.map((field) => {
              return (
                <div key={field}>
                  <label htmlFor={field}>
                    {field.slice(0, 4)} {field.slice(4)}
                  </label>
                  <Field
                    name={field}
                    id={field}
                    type={
                      field === "taskHours"
                        ? "number"
                        : field === "taskDay"
                        ? "date"
                        : "text"
                    }
                  />
                  <ErrorMessage name={field}>
                    {() => (
                      <div className="error">
                        {field.slice(0, 4)} {field.slice(4)} can't be empty
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              );
            })}
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      {created && <div className="success">task has been created</div>}
    </div>
  );
}

export default NewTask;
