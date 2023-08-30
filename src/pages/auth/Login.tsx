import React, { useEffect, useState, useContext } from "react";
import Auth from "../../layout/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function Login() {
  // define state
  const [emailForm, setEmailForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");

  // define validation
  const [validation, setValidation] = useState({message: null, email: null, password: null});

  // define navigate
  const navigate = useNavigate();

  // hooks useEffect for redirect to dashboard if user is login
  useEffect(() => {
    // check token
    if(localStorage.getItem("token")){
      navigate("/admin");
    }
  }, []);

  // define user context
  const { name, setName, setEmail } = useContext(UserContext);

  // function handle login
  const handleLogin =async (e :any) => {
    e.preventDefault();

    // initialize formData
    const formData = new FormData();

    formData.append("email", emailForm);
    formData.append("password", passwordForm);

    // send data to server
    await axios.post("http://localhost:8000/api/login", formData)
    .then((response) => {
      // check if response status 200
      if(response.status === 200){
        // set token to localStorage
        localStorage.setItem("token", response.data.authorization.token);

        console.log(response.data.user.name);
        // set user to userContext
        setName(response.data.user.name);
        setEmail(response.data.user.email);

        console.log(name);

        // redirect to dashboard
        navigate("/admin");
      }
    })
    .catch((error) => {
      setValidation(error.response.data);
    });
  }

  return (
    <Auth>
      <div className="flex flex-col overflow-y-auto md:flex-row">
        <div className="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            className="object-cover w-full h-full"
            src="assets/img/login-office.jpeg"
            alt="Office"
          />
        </div>
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <form onSubmit={handleLogin}>
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700">
                Login
              </h1>
              {validation.message && (
                <div className="alert alert-error mb-3">{validation.message}</div>
              )}
              <label className="block text-sm">
                <span className="text-gray-700">Email</span>
                <input
                  name="email"
                  className="block w-full mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                  placeholder="Jane Doe"
                  value={emailForm}
                  onChange={(e) => setEmailForm(e.target.value)}
                />
              </label>
              {validation.email && (
                <div className="alert alert-error">{validation.email[0]}</div>
              )}
              <label className="block mt-4 text-sm">
                <span className="text-gray-700">Password</span>
                <input
                  name="password"
                  className="block w-full mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                  placeholder="***************"
                  type="password"
                  value={passwordForm}
                  onChange={(e) => setPasswordForm(e.target.value)}
                />
              </label>
              {validation.password && (
                <div className="alert alert-danger">
                  {validation.password[0]}
                </div>
              )}
              <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Log in
              </button>

              <hr className="my-8" />

              <p className="mt-4">
                <a
                  className="text-sm font-medium text-purple-600 hover:underline"
                  href="./forgot-password.html"
                >
                  Forgot your password?
                </a>
              </p>
              <p className="mt-1">
                <a
                  className="text-sm font-medium text-purple-600 hover:underline"
                  href="./create-account.html"
                >
                  Create account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Auth>
  );
}

export default Login;