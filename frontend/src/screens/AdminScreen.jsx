import React from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../slices/adminApiSlice"; 
import { Button, Image, Table, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminScreen = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useGetAllUsersQuery(undefined, {
    pollingInterval: 1000, // Poll every 1 second, it will refetch the data automatically every 1 second
  });

  const [deleteUser] = useDeleteUserMutation(); // Using the delete mutation

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const res = await deleteUser(userId);
      if (res.error) {
        toast.error(res.error.data.message); // using a try-catch block was not working as the response is being sent, you need to check the res.status and throw error manually
        return;
      }
      console.log(res);
      toast.success(res.data.message);
    }
  };

  return (
    <Container>
      <h1 className="my-3">Admin Dashboard</h1>
      <hr />

      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          Error fetching users: {error.message}
        </div>
      ) : (
        <Table responsive bordered hover className="table-sm">
          <thead>
            <tr>
              <th style={{ padding: "10px", textAlign: "left" }}>
                Profile Picture
              </th>
              <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ padding: "10px" }}>
                  <Image
                    src={user.pic} // to add the image
                    height="50px"
                    width="50px"
                    roundedCircle
                    className="me-2" // Adds some margin to the right
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td style={{ padding: "10px" }}>{user.name}</td>
                <td style={{ padding: "10px" }}>{user.email}</td>
                <td style={{ padding: "10px" }}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminScreen;
