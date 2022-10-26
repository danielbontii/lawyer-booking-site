import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = ({ postRoute }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = async () => {
      let navigatePage;
      try {
        const response = await axios.post(`${postRoute}`, formData);
        console.log(response.headers);
        if (response.status == 400) {
          console.log("here");
          return;
        }
        if (response) {
          if (response.data.userType === "lawyer") {
            localStorage.setItem("lawyerId", response.data.id);
            navigatePage = "lawyer-dashboard";
          }

          if (response.data.userType === "client") {
            navigatePage = "client-dashboard";
          }

          if (response.data.userType === "admin") {
            navigatePage = "admin-dashboard";
          }

          navigate(`/${navigatePage}`);
        }
      } catch (error) {
        console.log(error);
        error.response.data.map((err) => toast.error(err.message));
      }
    };

    postData();
  };

  return (
    <div className="page">
      <Container>
        <Form noValidate className="mt-5 login-form">
          <Row className="row-cols-1">
            <Col>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
                  placeholder="Enter email here"
                  onChange={(e) => handleChange(e)}
                  value={email}
                />
                <label for="email">Email</label>
              </div>
            </Col>
            <Col>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  placeholder="Enter password here"
                  onChange={(e) => handleChange(e)}
                  value={password}
                />
                <label for="password">Password</label>
              </div>
            </Col>
          </Row>
          <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
            LOGIN
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;
