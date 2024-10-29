import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">PROFILE APP</h1>
          <p className="text-center mb-4">
            Welcome to our platform! Here, you can easily register to join our
            community and enjoy a seamless login experience. Manage your account
            effortlessly with options to see and update your profile whenever
            you like. If you're an admin, you have the additional capability to
            delete other profiles, ensuring our community remains safe and
            well-maintained. Join us today and experience the full range of
            features designed to enhance your online experience!
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Register</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
