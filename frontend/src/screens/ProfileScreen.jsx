import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { set } from "mongoose";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [pic, setPic] = useState(null); // Image file state
  const [preview, setPreview] = useState(""); // Image preview URL state

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    // Set initial user info
    setEmail(userInfo.email);
    setName(userInfo.name);
    setPreview(userInfo.pic); // Set initial profile picture from userInfo
    setIsAdmin(userInfo.isAdmin);
  }, [userInfo]);


  // Update the preview URL whenever the user selects a new image
  useEffect(() => {
    if (!pic) {
      // Reset to the user's original profile image if no new image is selected
      setPreview(userInfo.pic);
      return;
    }

    // Create a temporary URL for the image preview
    const objectUrl = URL.createObjectURL(pic);
    setPreview(objectUrl);

    // Clean up the URL when the component is unmounted or when `pic` changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [pic, userInfo.pic]);

  
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
    const res = await updateUser(formData).unwrap();
    dispatch(setCredentials({ ...res }));
    navigate("/");
  } catch (err) {
    toast.error(err?.data?.message || err.error);
  }
};

  return (
    <FormContainer>
      <h2>Update Profile</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Profile Picture</Form.Label>
          <Image
            src={preview} // Display the preview image
            alt="Profile"
            className="d-block mx-auto my-3"
            style={{
              width: "150px", // Fixed width
              height: "150px", // Fixed height
              borderRadius: "50%", // Circular shape
              objectFit: "cover", // Ensures the image covers the container
            }}
          />
          <Form.Control
            type="file"
            onChange={(e) => setPic(e.target.files[0])}
          />


        </Form.Group>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
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

        <Form.Group className="my-2" controlId="isAdmin">
          <Form.Check
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
