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

  const { signUp } = useAuth();

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
      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h3 className="mb-3 text-muted">Register Now</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form onSubmit={handleSubmit} className="row g-4">
                        <div className="text-muted">
                          {error && <p className="text-danger">{error}</p>}
                        </div>
                        <div className="col-12">
                          <label className="text-muted">
                            Email<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="bi bi-envelope-fill"></i>
                            </div>
                            <input
                              type="email"
                              name="email"
                              className="form-control text-muted"
                              placeholder="Enter Email"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label className="text-muted">
                            Username<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="bi bi-person-fill"></i>
                            </div>
                            <input
                              type="text"
                              name="username"
                              className="form-control text-muted"
                              placeholder="Enter Username"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="text-muted">
                            Date of Birth<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="bi bi-calendar-date"></i>
                            </div>
                            <input
                              type="date"
                              name="dob"
                              className="form-control text-muted"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        {isOver18 && (
                          <div className="col-12">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="showNSFW"
                                id="nsfwCheck"
                                checked={user.showNSFW}
                                onChange={handleChange}
                              />
                              <label className="form-check-label text-muted" htmlFor="nsfwCheck">
                                Show NSFW Content (18+)
                              </label>
                            </div>
                          </div>
                        )}

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
                              className="form-control text-muted"
                              placeholder="Enter Password"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="text-muted">
                            Confirm Password
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="bi bi-lock-fill"></i>
                            </div>
                            <input
                              onChange={handleChange}
                              type="password"
                              name="confirmPassword"
                              className="form-control text-muted"
                              placeholder="Confirm Password"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary px-4 float-end mt-4"
                          >
                            Register
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

