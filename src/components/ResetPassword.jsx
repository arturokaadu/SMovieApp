import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./Context/authContext.jsx";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [userData, setUserData] = useState({
    user: "",
    password: "",
  });
  //localStorage.setItem("userLogged", JSON.stringify(data.payload));
  //working

  const { login, resetPassword } = useAuth();

  function handleState(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const handleResetPassword = async () => {
    if (!userData.email) return setError("Please enter your email");
    console.log("reset");
    try {
      await resetPassword(userData.email);
      setError("we sent you an email with a link to reset");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      {/* {token && <Navigate to="/listado" />} */}
      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h3 className="mb-3 text-muted">Reset password</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form className="row g-4">
                        <div>{error && <p>{error}</p>}</div>
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
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Enter Password"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            onClick={handleResetPassword}
                            type="submit"
                            className="btn btn-primary px-4 float-end mt-4"
                          >
                            Reset Password
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
