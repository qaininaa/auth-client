import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div>
        <div>
          <h1 className="text-blue-500 text-4xl font-semibold">Public Link</h1>
          <ul>
            <li className="hover:text-blue-600">
              <Link to={"/login"}>Login</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link to={"/register"}>Register</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-blue-500 text-4xl font-semibold mt-10">
            Private Link
          </h1>
          <ul>
            <li className="hover:text-blue-600">
              <Link to={"/home"}>Home</Link>
            </li>
            <li className="hover:text-blue-600">
              <Link to={"/admin"}>Admin Page</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
