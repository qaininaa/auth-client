import { useEffect, useState } from "react";
import useAxiosInstance from "../hooks/useAxiosInstance";

const Products = () => {
  const [products, setProducts] = useState([]);
  const axios = useAxiosInstance();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get("/products", {
          signal: controller.signal,
        });
        mounted && setProducts(response.data.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();

    return () => {
      (mounted = false), controller.abort();
    };
  }, [axios]);
  return (
    <div>
      <ul>
        {products &&
          products.map((product, i) => <li key={i}>{product.name}</li>)}
      </ul>
    </div>
  );
};

export default Products;
