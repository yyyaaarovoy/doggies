import { useCallback, useContext, useEffect, useState } from "react";
import classes from "./UserProfile.module.css";

import AuthContext from "../../store/auth-context";

import { child, get, ref } from "firebase/database";
import { db } from "../../firebase-config";
import TabsTable from "../TabsTable/TabsTable";
import Spinner from "../Spinner/Spinner";

const fetchMyTabs = async (uid) => {
  const dbRef = ref(db);
  return get(child(dbRef, "/posts/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()).filter((tab) => tab.uid === uid);
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const UserProfile = () => {
  const [myTabs, setMyTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;

  const fetchTabsHandler = useCallback(async () => {
    const tabs = await fetchMyTabs(user.uid);
    setMyTabs(tabs);
    setIsLoading(false);
  }, [setMyTabs, user.uid]);

  useEffect(() => {
    fetchTabsHandler();
  }, [fetchTabsHandler]);

  return (
    <>
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <h2>
          Welcome back, &nbsp;
          <span>{user.email}</span>
        </h2>
        <h2>Doggies created by you:</h2>
      </section>
      <section className={classes.main}>
        {isLoading && (
          <div className={classes.spinner}>
            <Spinner />
          </div>
        )}
        {!isLoading && <TabsTable tabs={myTabs} />}
      </section>
    </>
  );
};

export default UserProfile;
