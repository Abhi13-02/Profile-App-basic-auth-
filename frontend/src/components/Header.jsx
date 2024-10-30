// import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../slices/authSlice";
// import { useLogoutMutation } from "../slices/usersApiSlice";

// const Header = () => {
//   const { userInfo } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
//         <Container>
//           <LinkContainer to="/">
//             <Navbar.Brand>MERN App</Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               { userInfo ? (
//                 <>
//                   <NavDropdown title={userInfo.name} id="username">
//                     <LinkContainer to="/profile">
//                       <NavDropdown.Item>Profile</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item onClick={logoutHandler}>
//                       Logout
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </>
//               ) : (
//                 <>
//                    <LinkContainer to="/login">
//                       <Nav.Link>
//                        <FaSignInAlt /> Sign In
//                       </Nav.Link>
//                    </LinkContainer>
//                    <LinkContainer to="/register">
//                      <Nav.Link>
//                        <FaSignOutAlt /> Sign Up
//                      </Nav.Link>
//                    </LinkContainer>
//                 </>
//               ) }
              
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;




import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Image, // Importing Image from react-bootstrap
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>PROFILE APP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <>
                        <Image
                          src={userInfo.pic} // to add the image
                          height="40px"
                          width="40px"
                          roundedCircle
                          className="me-2" // Adds some margin to the right
                          style={{ objectFit: "cover" }}
                        />
                        {userInfo.name}
                      </>
                    }
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

