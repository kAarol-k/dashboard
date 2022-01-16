import { useState } from "react";
import { createUser, userAdded } from "./redux/features/usersSlice";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const nextUserId = useSelector((state) => state.users.users.length);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValue = {
    id: nextUserId + 1,
    name: "",
    email: "",
    username: "",
    address: {
      city: "",
    },
  };
  const [user, setUser] = useState(initialValue);
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (user.name && user.email) {
      dispatch(
        createUser({
          id: nextUserId + 1,
          name: user.name,
          email: user.email,
          address: { city: user.address.city },
        })
      );
      dispatch(
        userAdded({
          id: nextUserId + 1,
          name: user.name,
          email: user.email,
          address: { city: user.city },
        })
      );
      setError(null);
      navigate("/");
    } else {
      setError("All fields are required");
    }
  };

  const handleCancel = () => navigate("/");

  return (
    <div className="forms">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="nameInput"
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>email</Form.Label>
          <Form.Control
            id="emailInput"
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
            type="email"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddUser} type="submit">
          Submit
        </Button>
        <Button variant="primary" onClick={handleCancel} type="submit">
          Cancel
        </Button>
      </Form>
      <h3 className="error">{error}</h3>
    </div>
  );
};

export default AddUser;
