import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { updateUser, userUpdated } from "./redux/features/usersSlice";
import { Button, Form } from "react-bootstrap";

function EditUser() {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edituser/", ""));
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === userId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [city, setCity] = useState(user?.address?.city);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleCity = (e) => setCity(e.target.value);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      userUpdated({
        id: userId,
        name,
        username,
        email,
        city,
      })
    );
    dispatch(
      updateUser({
        id: userId,
        username,
        name,
        email,
        city,
      })
    );
    navigate("/");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="forms">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="nameInput"
            onChange={handleName}
            value={name}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="nameInput"
            onChange={handleUsername}
            value={username}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>email</Form.Label>
          <Form.Control
            id="emailInput"
            onChange={handleEmail}
            value={email}
            placeholder="Enter email"
            type="email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>city</Form.Label>
          <Form.Control
            id="emailInput"
            onChange={handleCity}
            value={city}
            placeholder="Enter City"
            type="text"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleClick} type="submit">
          Submit
        </Button>
        <Button variant="primary" onClick={handleCancel} type="submit">
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default EditUser;
