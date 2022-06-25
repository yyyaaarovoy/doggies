import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const registerUser = async (email, password) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = async (email, password) => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
};

const AuthForm = () => {
  const history = useNavigate();
  const authCtx = useContext(AuthContext);
  const { login: authCtxLoginUser } = authCtx;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const switchAuthModeHandler = () => {
    setError(undefined);
    setIsLogin((prevState) => !prevState);
  };

  const errorHandler = (error) => {
    switch (error.code) {
      case "auth/wrong-password":
        return "Your password is incorrect!";
      case "auth/user-not-found":
        return "Account with such email doesn't exist!";
      case "auth/email-already-in-use":
        return "Account with such email already exist!";
      case "auth/weak-password":
        return "Your password is too weak. Complicate it!";
      default:
        return error.message;
    }
  };

  const authHandler = async (email, password) => {
    try {
      if (isLogin) {
        await loginUser(email, password);
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
          if (user) {
            authCtxLoginUser(user);
          }
        });
      } else {
        await registerUser(email, password);
      }
      history("/");
    } catch (error) {
      const errorMsg = errorHandler(error);
      setError(errorMsg);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    await authHandler(enteredEmail, enteredPassword);

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            disabled={isLoading}
            type="email"
            id="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            disabled={isLoading}
            type="password"
            id="password"
            min="6"
            required
            ref={passwordInputRef}
          />
          {error && !isLoading && <p className={classes.error}>{error}</p>}
        </div>
        <div className={classes.actions}>
          <div>
            {isLoading ? (
              <p>Sending request...</p>
            ) : (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
          </div>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
            disabled={isLoading}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
