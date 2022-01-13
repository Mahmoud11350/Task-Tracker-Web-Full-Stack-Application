import { Formik, Form, Field } from "formik";
import { GlobalContext } from "../context/appContext";
import "../styles/tasks.css";

function AllTasks() {
  const { Axios, tasks, newtask, searchTasks } = GlobalContext();

  const initialValues = {
    taskTitle: "all",
    searchField: "",
    sortBy: "latest",
  };
  const submitHandler = async (values) => {
    const { data } = await Axios.get("/tasks", {
      params: {
        taskProgress:
          values.taskTitle === "all"
            ? null
            : values.taskTitle === "completed"
            ? true
            : false,
        sortby:
          values.sortBy === "oldeset" ? "createdAt:sec" : "createdAt:desc",
        taskTitle: values.searchField,
      },
    });
    searchTasks(data);
  };

  const deleteTask = async (id) => {
    await Axios.delete(`/tasks/delete/${id}`);
    newtask();
  };
  const taskComplete = async (id) => {
    const complete = { taskProgress: true };
    await Axios.patch(`/tasks/update/${id}`, complete);
    newtask();
  };
  let taskContent = (
    <div className="no-tasks">
      <h1>No Task Created Yet</h1>
    </div>
  );

  if (tasks !== null) {
    taskContent = tasks.tasks.map((task) => {
      return (
        <div key={task._id}>
          <div>
            <h2 className="task-title">{task.taskTitle}</h2>
          </div>
          <div className="task-info">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
            </svg>{" "}
            <span>Task Day {task.taskDay}</span>
            <span>Task will take {task.taskHours} Hours</span>
          </div>
          <div className="task-info info-2">
            <h5> Created At :{task.createdAt}</h5>
            <h5
              className={task.taskProgress === false ? "pending" : "completed"}
            >
              {" "}
              {task.taskProgress === false ? "pending" : "completed"}
            </h5>
          </div>
          <div className="btns">
            <button className="error" onClick={() => deleteTask(task._id)}>
              Delete Task{" "}
            </button>
            {task.taskProgress === false && (
              <button
                className="success"
                onClick={() => taskComplete(task._id)}
              >
                Completed !
              </button>
            )}
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="tasks-wrapper">
        <div className="search-form">
          <h1>Search Form</h1>
          <Formik initialValues={{ ...initialValues }} onSubmit={submitHandler}>
            <Form>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <label htmlFor="status">Status</label>
                  <Field as="select" name="taskTitle" id="status">
                    <option value="all">all</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">inProgress</option>
                  </Field>
                </div>
                <div>
                  <label htmlFor="sort">Sort</label>
                  <Field as="select" name="sortBy" id="sort">
                    <option value="latest">latest</option>
                    <option value="oldeset">oldeset</option>
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
        <div className="tasks"></div>
        <div className="tasks">{taskContent}</div>
      </div>
    </>
  );
}

export default AllTasks;
