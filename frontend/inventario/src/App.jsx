import { useEffect, useState } from "react";
import axios from "axios";
import Router from "./routes/Router";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/products");
        const data = response.data;
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="mainApp">
        <Router />
    </main>
  );
}

export default App;
