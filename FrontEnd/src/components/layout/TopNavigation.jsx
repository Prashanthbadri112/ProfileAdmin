import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TopNavigation = () => {
  return (
    <>
      <Navbar  sticky="top" bg="light" data-bs-theme="light" className="mb-4">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold">
            Home
          </Navbar.Brand>
          <Nav className="flex-grow-1 justify-content-end">
            <Nav.Link as={NavLink} to="/create" className="fw-bold">
              Create User
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};


export default TopNavigation;