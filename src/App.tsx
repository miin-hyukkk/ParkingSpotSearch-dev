import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PATH from "./constants/path";
import Main from "./pages/main";
import Detail from "./pages/detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={PATH.MAIN}>
          <Route index element={<Main />} />
        </Route>
        <Route path={PATH.DETAIL}>
          <Route path=":spotId" element={<Detail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
