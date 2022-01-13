import styles from "../styles/landing.module.css";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      <div className={styles.landing}>
        <h1>
          <span>Task</span> Tracker
        </h1>
        <div className="landingwraper">
          <div className={styles["landing-content"]}>
            <h2>
              Task <span>Tracking</span> App
            </h2>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
            <Link to="/register">
              <button to="/register">Login/Register</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
