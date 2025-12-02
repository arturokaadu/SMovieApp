import axios from "axios";
import swal from "@sweetalert/with-react";
import { useState } from "react";
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/internal-error") {

        setError("correo o contraseña inválidos");
      }
      else if (error.code === "auth/wrong-password") {
        setError("contraseña inválida")
      }
      else if (error.code === "auth/user-not-found") {
        setError("Usuario Inválido")
      }
    }
  };

  function validateMail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  let token = sessionStorage.getItem("token");
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const { login, loginWithGoogle } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    //console.log(name, value);
    /* setError(validated({ ...user, [name]: value })); */
  };

  return (
    <>
      {/* {token && <Navigate to="/listado" />} */}
      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h3 className="mb-3 text-muted">Login Now</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form onSubmit={handleSubmit} className="row g-4">
                        <div className="text-black">{error && <p className="text-black">{error}</p>}</div>
                        <div className="col-12">
                          <label className="text-muted">
                            email<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="bi bi-person-fill"></i>
                            </div>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter Username"
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="text-muted">
                            Password<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="bi bi-lock-fill"></i>
                            </div>
                            <input
                              onChange={handleChange}
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Enter Password"
                            />
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

                      <hr className="my-4" />
                      <button
                        className="btn btn-outline-danger w-100 mb-3"
                        onClick={async () => {
                          try {
                            await loginWithGoogle();
                            navigate("/");
                          } catch (error) {
                            setError("Error logging in with Google");
                          }
                        }}
                      >
                        <i className="bi bi-google me-2"></i>
                        Login with Google
                      </button>

                      <div className="col-12">
                        <Link to="/register" className="linkci text-muted">
                          <span className="text-muted">
                            don't have an account? REGISTER HERE
                          </span>
                        </Link>
                      </div>

                      <div className="col-12">
                        <Link to="/resetPassword" className="linkci text-muted">
                          <span className="text-muted">
                            Forgot password? RESET HERE
                          </span>
                        </Link>
                      </div>
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
