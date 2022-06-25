import classes from "./Tab.module.css";

const Tab = ({ data }) => {
  const { email, date, description, imageUrl } = data;

  return (
    <li className={classes.content}>
      <div className={classes.header}>
        <p className={classes.creationDate}>{date}</p>
      </div>
      <div className={classes.image}>
        <img src={imageUrl} alt="dog" />
      </div>
      <div className={classes.footer}>
        <p>{description}</p>
        <p className={classes.creator}>
          <span>Created by:</span>
          &nbsp;
          {email}
        </p>
      </div>
    </li>
  );
};

export default Tab;
