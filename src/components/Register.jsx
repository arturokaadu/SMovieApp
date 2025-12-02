import { useState } from "react";
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  let validateMail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let vUserName = /^[a-z][^\W_]{7,14}$/i;
  //Must be 8-15 characters and must start with a letter
  //May not contain special characters – only letters and numbers

  let password = /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/;

  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    dob: "",
    showNSFW: false
  });
  const [isOver18, setIsOver18] = useState(false);

  function validated(user) {
    let errors = {};
    if (!vUserName.test(user.username)) {
      errors.username =
        "username is required and must contain 8-15 characters starting with a letter. No spaces ";
    }
    if (!validateMail.test(user.email)) {
      errors.email = "Please insert Valid email pattern";
    }
    if (!password.test(user.password)) {
      errors.password =
        "5 to 20 characters. at least one lower-case letter and one number. No special Characters";
    }
    if (!user.dob) {
      errors.dob = "Date of Birth is required";
    }

    return errors;
  }

  const { signUp, loginWithGoogle } = useAuth();

  const handlePass = () => {
    if (user.password !== user.confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'dob') {
      const age = calculateAge(value);
      setIsOver18(age >= 18);
      if (age < 18) {
        setUser(prev => ({ ...prev, [name]: value, showNSFW: false }));
      } else {
        setUser(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setUser({ ...user, [name]: newValue });
    }

    // Only validate text inputs on change to avoid annoying errors while typing
    if (type !== 'checkbox') {
      // setError(validated({ ...user, [name]: newValue })); // This might be too aggressive, let's validate on submit or blur
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validated(user);

    // Check if errors object is empty (or has no truthy values)
    const hasErrors = Object.values(errors).some(x => x);

    if (!hasErrors) {
      if (handlePass()) {
        setError("");
        try {
          await signUp(user.email, user.password, user.username, user.dob, user.showNSFW);
          navigate("/login");
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError("Passwords do not match");
      }
    } else {
      // Set the first error found
      const firstError = Object.values(errors).find(x => x);
      setError(firstError || "Incorrect data, please check form");
    }
  };

  return (
    <>
      <div className="login-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="glass-panel text-white">
                <h3 className="mb-4 text-center neon-text">Register Now</h3>
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <form onSubmit={handleSubmit} className="row g-4">
                      <div className="text-center">
                        {error && <div className="alert alert-danger">{error}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-secondary">
                          Username<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <i className="bi bi-person-fill"></i>
                          </span>
                          <input
                            type="text"
                            name="username"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Enter Username"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-secondary">
                          Email<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <i className="bi bi-envelope-fill"></i>
                          </span>
                          <input
                            type="email"
                            name="email"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label text-secondary">
                          Date of Birth<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <i className="bi bi-calendar-date"></i>
                          </span>
                          <input
                            type="date"
                            name="dob"
                            className="form-control bg-dark text-white border-secondary"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {isOver18 && (
                        <div className="col-12">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="showNSFW"
                              id="nsfwCheck"
                              checked={user.showNSFW}
                              onChange={handleChange}
                            />
                            <label className="form-check-label text-secondary" htmlFor="nsfwCheck">
                              Show NSFW Content (18+)
                            </label>
                          </div>
                        </div>
                      )}

                      <div className="col-md-6">
                        <label className="form-label text-secondary">
                          Password<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <i className="bi bi-lock-fill"></i>
                          </span>
                          <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Enter Password"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-secondary">
                          Confirm Password<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <i className="bi bi-lock-fill"></i>
                          </span>
                          <input
                            onChange={handleChange}
                            type="password"
                            name="confirmPassword"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Confirm Password"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary w-100 mb-3"
                        >
                          Register
                        </button>

                        <div className="d-flex align-items-center mb-3">
                          <hr className="flex-grow-1 border-secondary" />
                          <span className="mx-3 text-muted">OR</span>
                          <hr className="flex-grow-1 border-secondary" />
                        </div>

                        <button
                          type="button"
                          className="btn btn-outline-light w-100"
                          onClick={async () => {
                            try {
                              await loginWithGoogle();
                              navigate("/");
                            } catch (error) {
                              setError(error.message);
                            }
                          }}
                        >
                          <i className="bi bi-google me-2"></i>
                          Sign up with Google
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
    </>
  );
};

