import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("userContext", user);
        setUserLogin(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    // Unsubscribe from the event when the component unmounts
    return () => unsubscribe();
  }, [auth]);
  return (
    <AuthContext.Provider value={userLogin}>{children}</AuthContext.Provider>
  );
}
export let UseContextUser = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
