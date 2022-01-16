import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchUsers } from "./redux/features/usersSlice";
import "./App.css";

store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
