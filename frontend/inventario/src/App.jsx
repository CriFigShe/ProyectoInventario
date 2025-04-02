import { useEffect, useState } from "react";
import { Button } from "@mantine/core";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await fetch("http://localhost:5000/products", { method: "GET" }); 
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <section>
      {data.map((product) => {
        return (<div>
          <p>{product.name}</p>
          <p>{product.type}</p>
        </div>)
      })}
      <Button color="blue">Prueba mantine</Button>
      </section>
    </main>
  );
}

export default App
