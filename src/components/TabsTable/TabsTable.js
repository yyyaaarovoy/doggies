import Tab from "../Tab/Tab";
import classes from "./TabsTable.module.css";

const TabsTable = ({ tabs }) => {
  if (!tabs.length) {
    return <p className={classes.noItems}>No items yet. You can add some!</p>;
  }

  return (
    <ul className={classes.table}>
      {tabs.map((tab) => (
        <Tab key={tab.id} data={tab} />
      ))}
    </ul>
  );
};

export default TabsTable;
