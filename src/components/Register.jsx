import { useState } from "react";
import { useAuth } from "./Context/authContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const navigate = useNavigate();
  let noEmpty = /\S+/;

  let validateMail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //A regular expression that matches and validates email addresses.

  //allows Latin characters ("a" - "z" or "A" - "Z") within the email address.
  //permits digits (0 - 9) in the email address.

  let vUserName = /^[a-z][^\W_]{7,14}$/i;
  //Must be 8-15 characters and must start with a letter
  //May not contain special characters – only letters and numbers

  let password = /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/;
  //Ingrese 5 a 20 caracteres, minimo 1 numero, no debe contener
  /* ust contain at least one lower-case letter (abcdefghijklmnopqrstuvwxyz)
    Must contain at least one number (0123456789)
    Must not contain a colon (:); an ampersand (&); a period (.); a tilde (~); or a space.
     */
  const [error, setError] = useState("");

  function validated(user) {
    let errors = [];
    //a bit of an issue here objects are not valid as react child
    if (!noEmpty || !vUserName.test(user.username)) {
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

    return errors;
  }
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const { signUp } = useAuth();

  const handlePass = () => {
    if (user.password !== user.confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    //console.log(name, value);
    setError(validated({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!error.username && !error.password && !error.email) {
        if (handlePass()) {
          setError("");

          await signUp(user.email, user.password);
          navigate("/login");
        } else {
          setError("Passwords do not match");
        }
      } else {
        throw new Error("incorrect data, please check form");
      }
    } catch (error) {
      setError(error.message);
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
                          {error && <p className="text-muted">{error}</p>}
                        </div>
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
                              className="form-control text-muted"
                              placeholder="Enter Username"
                              onChange={handleChange}
                            />
                            {error.email && <span className="text-muted">{error.email}</span>}
                          </div>
                        </div>
                        <div className="col-12">
                          <label className="text-muted">
                            username<span className="text-danger">*</span>
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
                            />
                            {error.username && (
                              <span className="text-muted">{error.username}</span>
                            )}
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
                              className="form-control text-muted"
                              placeholder="Enter Password"
                            />
                            {error.password && <span className="text-muted">{error.password}</span>}
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
                              placeholder="confirm Password"
                            />
                            {error.password && (
                              <span className="text-muted">
                                {error.password}
                              </span>
                            )}
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
