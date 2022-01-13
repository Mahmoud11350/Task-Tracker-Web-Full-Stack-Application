import notfound from "../assets/not-found.svg";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <>
      <div
        className="notfound"
        style={{
          textAlign: "center",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "50px",
        }}
      >
        <img src={notfound} style={{ width: "100%" }} alt="NotFound-404" />
        <Link
          style={{
            textDecoration: "none",
            color: "var(--main-color)",
            fontSize: "20px",
          }}
          to="/landing"
        >
          Back Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
