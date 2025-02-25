import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import React from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";


function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null); // State for profile picture
  const [isAdmin, setIsAdmin] = useState(false); // State for admin checkbox

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);


  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     toast.error("Passwords do not match");
  //   } 
  //   else {
  //     console.log(name, email, password, pic, isAdmin);
  //       try {
  //         const res = await register({ email, password, name, pic, isAdmin }).unwrap();
  //         dispatch(setCredentials({ ...res }));
  //         navigate("/");
  //       } catch (err) {
  //         toast.error(err?.data?.message || err.error);
  //       }
  //   }

  // };

 const submitHandler = async (e) => {
   e.preventDefault();

   if (password !== confirmPassword) {
     toast.error("Passwords do not match");
     return;
   }

   try {
     // Correctly define FormData as a constructor using "new"
     const formData = new FormData();
     formData.append("name", name);
     formData.append("email", email);
     formData.append("password", password);
     formData.append("isAdmin", isAdmin);

     if (pic) {
       formData.append("pic", pic);
     }

     // Pass formData to the register mutation
     const res = await register(formData).unwrap();
     dispatch(setCredentials({ ...res }));
     navigate("/");
   } catch (err) {
     toast.error(err?.data?.message || err.error);
   }
 };



  return (
    <FormContainer>
      <h1>Register</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Profile Picture Field */}
        <Form.Group className="my-2" controlId="pic">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setPic(e.target.files[0])} // Save the file in state
          />
        </Form.Group>

        {/* isAdmin Checkbox Field */}
        <Form.Group className="my-2" controlId="isAdmin">
          <Form.Check
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)} // Toggle the isAdmin state
          />
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
