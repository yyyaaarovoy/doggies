import Spinner from "../Spinner/Spinner";
import classes from "./LoadingForm.module.css";

const LoadingForm = () => {
  return (
    <div className={classes.wrapper}>
      <Spinner />
    </div>
  );
};

export default LoadingForm;
