import "./App.css";
import AddUser from "./AddUser";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import EditUser from "./EditUser";
import { Card } from "react-bootstrap";
function App() {
  return (
    <>
      <h1>Dashborad</h1>
      <div className="app">
        <Card style={{ width: "75rem" }} body>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route exact path="/adduser" element={<AddUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />
          </Routes>
        </Card>
      </div>
    </>
  );
}

export default App;
