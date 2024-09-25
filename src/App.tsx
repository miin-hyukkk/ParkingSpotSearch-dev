import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PATH from "./constants/path";
import Main from "./pages/main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={PATH.MAIN}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
