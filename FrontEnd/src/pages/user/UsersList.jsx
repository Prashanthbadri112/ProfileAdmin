import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { List } from "react-content-loader";

import Layout from "../../components/layout/Layout.jsx";
import * as userService from "../../services/user.service.js";
import UserCard from "../../components/user/UserCard.jsx";
// import { Spinner } from "@chakra-ui/react";

const UsersList = () => {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const users = await userService.retrieveAllUsers();
      console.log(users);
      setUsers(users);
    } catch (error) {
      const retrieveErrorMessage = () => {
        const apiErrorMessage = error?.response?.data?.message;

        return apiErrorMessage ?? "An error occurred while connecting to API.";
      };

      setErrorMessage(retrieveErrorMessage());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <div className="text-center">
          <List />
        </div>
      ) : errorMessage ? (
        <h4 className="text-center text-danger fw-bold">{errorMessage}</h4>
      ) : (
        <>
          <h3 className="text-center mb-3">Users</h3>
          <Row className="justify-content-center ">
            {Object.values(users).map((user) => (
              <Col key={user._id} lg={4} className="p-1">
                <UserCard user={user} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Layout>
  );
};

export default UsersList;
