import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import NewTabPage from "./pages/NewTabPage";
import ProfilePage from "./pages/ProfilePage";
import LoadingPage from "./pages/LoadingPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn, login, logout } = authCtx;

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        login(user);
      } else {
        logout();
      }
    });
  }, [login, logout]);

  if (isLoggedIn === undefined) {
    return <LoadingPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!isLoggedIn && (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/new" element={<AuthPage />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/new" element={<NewTabPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        )}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
