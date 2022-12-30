import LoginGoogleFirebase from "./LoginGoogleFirebase";
import { Navigate, Route, Routes } from "react-router-dom";
import { UseContextUser } from "./Context/AuthContext";
import CreatePost from "./Post/CreatePost";
import ShowPost from "./Post/ShowPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const userLogin =
    UseContextUser() || JSON.parse(localStorage.getItem("dataUser"));
  const ProtectedRoute = ({ children }) => {
    console.log("1111", userLogin);
    if (!userLogin) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          index
          path="/"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginGoogleFirebase />} />
        <Route
          path="/showpost"
          element={
            <ProtectedRoute>
              <ShowPost />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
