import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import Spinner from "../Spinner/Spinner";
import TabsTable from "../TabsTable/TabsTable";
import classes from "./StartingPageContent.module.css";

const fetchTabs = async () => {
  const dbRef = ref(db);
  return get(child(dbRef, "/posts/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const StartingPageContent = () => {
  const [tabsData, setTabsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTabsHandler = async () => {
    const tabs = await fetchTabs();
    setTabsData(tabs);
    setIsLoading(false);
  };

  useEffect(() => {
    getTabsHandler();
  }, []);

  return (
    <>
      <section className={classes.starting}>
        <h1>Welcome on Board! Woof woof..</h1>
        <Link to="/new" className={classes.button}>
          Create new Doggie Tab
        </Link>
      </section>
      {isLoading && (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <section className={classes.main}>
          <TabsTable tabs={tabsData} />
        </section>
      )}
    </>
  );
};

export default StartingPageContent;
