import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { useStateValue } from "./components/StateProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./components/firebase";
import { Unsubscribe } from "@mui/icons-material";
function App() {
  //data layer
  const [{ user }, dispatch] = useStateValue();

  //Useeffect
  //pice of code which runs based on given conditions

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //the user is logged in...

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user is logged out...
        dispatch({
          type: "SET_USER",
          suser: null,
        });
      }
    });
    //any cleanup goes in here...

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("user is >>>", user);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/checkout"
            element={
              <>
                <Header /> <Checkout />
              </>
            }
          ></Route>

          <Route path="/login" element={<Login />}></Route>

          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
