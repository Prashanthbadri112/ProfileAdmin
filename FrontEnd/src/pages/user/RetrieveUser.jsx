import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import * as userService from "../../services/user.service.js";
import Layout from "../../components/layout/Layout.jsx";

const RetrieveUser = () => {
  const { userId } = useParams(); // Extract user ID from route params

  const [user, setUser] = useState(null); // Default to null to indicate no user

  const fetchUser = async () => {
    try {
      const user = await userService.retrieveUser(userId);
      setUser(user);
    } catch (error) {
      setUser(null);
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <Layout>
      {user ? (
        <Row className="justify-content-center">
          <Col lg={6}>
            <h3 className="text-center mb-3">{user.name}</h3>
            <Card>
              <Card.Body className="text-center">
                <p>{user.email}</p>
                {user.city && user.country && (
                  <p>
                    {user.city} - {user.country}
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <h1 className="text-center text-danger fw-bold">
          User Cannot be found
        </h1>
      )}
    </Layout>
  );
};

export default RetrieveUser;
