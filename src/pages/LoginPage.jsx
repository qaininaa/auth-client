import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { useRef } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { setAuth } = useAuth();
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axiosInstance.post("/users/login", data);

      if (!response.data.token) return;

      const accessToken = response.data.token;
      const role = response.data.role;
      setAuth({ email, password, role, accessToken });

      navigate(from, { replace: true });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            className="border border-black block p-2"
            ref={emailRef}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            required
            className="border border-black block p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="bg-blue-400 w-full mt-5 py-2 px-1">
          Submit
        </button>
      </form>
    </div>
  );
}
