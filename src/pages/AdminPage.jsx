import React from "react";
import Products from "../components/Products";
import useRefreshToken from "../hooks/UseRefreshToken";

const AdminPage = () => {
  const refresh = useRefreshToken();
  return (
    <>
      <h1>ADMIN PAGE</h1>
      <Products />
      <button onClick={() => refresh()}>refresh</button>
    </>
  );
};

export default AdminPage;
