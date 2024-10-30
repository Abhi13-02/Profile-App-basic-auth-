import React from "react";
import { Card, Image, Col, Row, Button } from "react-bootstrap";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

const HomeScreens = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {userInfo ? (
        <Card className="my-3 p-3 rounded shadow-sm">
          <Row className="align-items-center">
            {/* Left side: Profile picture */}
            <Col xs={12} md={6}>
              <Image
                src={userInfo.pic}
                alt="Profile"
                roundedCircle
                fluid
                className="d-block mx-auto my-3" // Center the image
                style={{
                  width: "400px", // Fixed width
                  height: "400px", // Fixed height
                  borderRadius: "50%", // Circular shape
                  objectFit: "cover", // Ensures the image covers the container
                }} // Adjust as needed for 50% card size
              />
            </Col>

            {/* Right side: Name and Admin Status */}
            <Col xs={12} md={6}>
              <h2 className="text-center">{userInfo.name}</h2>
              <p className="text-center text-muted">
                {userInfo.isAdmin ? "Admin" : "User"}
              </p>
            </Col>

            <hr />

            <Row className="text-center">
              <Col>
                <Button variant="danger" onClick={logoutHandler}>
                  Logout
                </Button>
              </Col>
              {
                userInfo.isAdmin &&
                <Col>
                  <LinkContainer to="/admin/users">
                    <Button variant="primary">Admin Panel</Button>
                  </LinkContainer>
                </Col>
              }
            </Row>
          </Row>
        </Card>
      ) : (
        <Hero />
      )}
    </>
  );
};

export default HomeScreens;
