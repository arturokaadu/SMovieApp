import axios from "axios";
import swal from "@sweetalert/with-react";

import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  swal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email === "" || password === "") {
      swal(<h5>Fields cannot be empty</h5>);
      return;
    }
    if (email !== "" && !validateMail(email)) {
      swal(<h5>Escribe una direccion valida</h5>);
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swal(<h5>Credentials are not valid</h5>);

      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swal(<h5>Login Succesfull</h5>);
        //console.log(res.data);
        const tokenRecieved = res.data.token;
        sessionStorage.setItem("token", tokenRecieved);
        //localStorage.setItem('nombre', 'Artur')
        navigate("/listado");
      });
  };

  function validateMail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to="/listado" />}
      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h3 className="mb-3">Login Now</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form onSubmit={handleSubmit} className="row g-4">
                        <div className="col-12">
                          <label>
                            Username<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="bi bi-person-fill"></i>
                            </div>
                            <input
                              type="text"
                              name="email"
                              className="form-control"
                              placeholder="Enter Username"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label>
                            Password<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="bi bi-lock-fill"></i>
                            </div>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Enter Password"
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="inlineFormCheck"
                            />
                            <label
                              className="form-check-label"
                              for="inlineFormCheck"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary px-4 float-end mt-4"
                          >
                            login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
