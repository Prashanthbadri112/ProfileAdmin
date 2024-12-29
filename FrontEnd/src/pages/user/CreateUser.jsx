import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout.jsx";
import * as userService from "../../services/user.service.js";
import { firstUpperCase } from "../../helpers/string.helper.js";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      city,
      country,
    };

    try {
      const res = await userService.createUser(payload);
      //console.log(res); // Log the API response
      if (res?.status) {
        const userName = res?.user?.name;

        toast.success(`User ${userName} has created`);
        // Clear the contents after the submission
        setName("");
        setEmail("");
        setCity("");
        setCountry("");
      } else {
        // Give an error message
        toast.warn("Error creating user");
      }
    } catch (error) {
      const getErrorMessage = () => {
        const {
          data: {
            errors: { body },
          },
        } = error.response;

        const message = body[0]?.message;
        return firstUpperCase(message);
      };

      toast.error(getErrorMessage());
    }
  };

  return (
    <Layout>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Name"
                onChange={(elName) => setName(elName.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the mail"
                onChange={(elEmail) => setEmail(elEmail.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the City"
                onChange={(elCity) => setCity(elCity.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Country"
                onChange={(elCountry) => setCountry(elCountry.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={submitForm}>
              Add User
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default CreateUser;
