import { useEffect, useState } from "react";
import * as userService from "../../services/user.service.js";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/layout/Layout.jsx";
import { firstUpperCase } from "../../helpers/string.helper.js";

const EditUser = () => {
  const { userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const populateUserFields = async () => {
    try {
      const user = await userService.retrieveUser(userId);
      setName(user.name);
      setEmail(user.email);
      setCity(user.city);
      setCountry(user.country);
    } catch (e) {
      console.error(e.message);
      window.location.href = "/";
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      city,
      country,
    };

    try {
      const response = await userService.EditUser(userId, payload);

      if (response?.status) {
        const userName = response.user.name;
        toast.success(`${userName} has been updated`);
      } else {
        toast.warn(`The user couldn't be updated`);
      }
    } catch (error) {
      const retrieveErrorMessage = () => {
        const {
          data: {
            errors: { body },
          },
        } = error.response;

        const message = body[0]?.message;

        return firstUpperCase(message);
      };

      toast.error(retrieveErrorMessage());
    }
  };

  useEffect(() => {
    populateUserFields();
  }, [userId]);

  return (
    <Layout>
      <h3 className="text-center">Edit User</h3>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(el) => setName(el.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(el) => setEmail(el.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(el) => setCity(el.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(el) => setCountry(el.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={submitForm} className="m-1">
              Update
            </Button>
            <Button variant="danger" as={NavLink} to={`/remove/${userId}`} className="m-1">
              Remove
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default EditUser;
