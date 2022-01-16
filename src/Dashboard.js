import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, userDeleted } from "./redux/features/usersSlice";

import { Link } from "react-router-dom";

function Dashboard() {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
    dispatch(deleteUser({ id }));
  };

  return (
    <div className="app">
      <Container>
        <Row>
          <Col sm={8}>
            <h1>User List</h1>
          </Col>
          <Col sm={4}>
            <Link to={"/adduser"}>
              <Button variant="primary">Add user</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td>"No users"</td>
                </tr>
              ) : (
                users.length &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user?.address?.city}</td>
                    <td>
                      <Link to={`/edituser/${user.id}`}>
                        <Button variant="warning">edit</Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
