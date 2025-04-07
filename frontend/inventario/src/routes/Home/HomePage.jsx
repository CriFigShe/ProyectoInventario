import "./HomePage.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function HomePage() {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await axios.get("http://localhost:5000/products", {
                    headers: {
                        'Authorization' : `${token}`
                    }
                });
                setProducts(response.data.data);
            } catch (error){
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [token]);

    if(loading) return <div>Cargando productos...</div>;
    if(error) return <div>Error: {error}</div>;

    return (
        <div className="divHome">
            <h1 className="homeTitle">Productos</h1>
            <div className="productsList">
                {products.map(product => (
                    <div key={product.id} className="productCard">
                        <h3>{product.name}</h3>
                        <p>{product.type}</p>
                        <p>{product.stock}</p>
                        <p>{product.cost}</p>
                        <p>{product.pvp}</p>
                        <p>{product.notes}</p>
                        <p>{product.userId}</p>
                        <p>{product.supplierId}</p>
                        <Link to={`/products/${product.id}`}>Ver detalles</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}