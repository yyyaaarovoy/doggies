import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const logoutUser = async () => {
  const auth = getAuth();
  await signOut(auth);
};

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const logoutHandler = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Doggies</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
