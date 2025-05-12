import "./Suppliers.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { IconX, IconCheck } from "@tabler/icons-react";
import { Notification } from "@mantine/core";

import { CiTrash } from "react-icons/ci";
import { GoPencil } from "react-icons/go";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);


  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const [registerSucceed, setRegisterSucceed] = useState();

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        if(!currentUser.token){
          navigate("/");
        }
        const response = await axios.get(
          `http://localhost:5000/suppliers/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        setSuppliers(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (registerSucceed !== undefined) {
      const timer = setTimeout(() => {
        setRegisterSucceed(undefined);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registerSucceed]);

  if (error) return <div>Error: {error}</div>;

  const handleDeleteSupplier = async (supplierId, supplierName) => {
    if (
      !window.confirm(
        "Estas seguro de eliminar este proveedor"
      )
    ) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/suppliers/${supplierId}`, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      setRegisterSucceed(true);
      setSuppliers(suppliers.filter((supplier) => supplier.id !== supplierId));
      setError(null);
    } catch (error) {
      setRegisterSucceed(false);
      setError(`Error al eliminar el proveedor: ${error}`);
    }
  };

  return (
    <main className="suppliersPage">
      <div className="suppliersTitle">
        <h2>Proveedores</h2>
        <Link to="/addSupplier">
          <button className="addSupplier">+</button>
        </Link>
      </div>

      <div className="notificationContainer">
        {registerSucceed == false && (
          <Notification
            icon={xIcon}
            color="red"
            title="Error al eliminar un proveedor"
            withCloseButton={false}
          />
        )}
        {registerSucceed == true && (
          <Notification
            icon={checkIcon}
            color="teal"
            title="Proveedor eliminado con exito"
            withCloseButton={false}
          />
        )}
      </div>
      <div>
        {suppliers.length > 0 && (
          <div className="suppliersContainer">
            <div className="listTitles">
              <h3>Nombre</h3>
              <h3>Contacto</h3>
              <h3>Acciones</h3>
            </div>
            <div className="suppliersList">
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="supplierCard">
                  <p>{supplier.name}</p>
                  <p>{supplier.contact}</p>
                  <p>
                    <Link to={`/editsupplier/${supplier.id}`}>
                      <button className="supplierActionButton">
                        <GoPencil />
                      </button>
                    </Link>
                    <button
                      className="supplierActionButton"
                      onClick={() => handleDeleteSupplier(supplier.id)}
                    >
                      <CiTrash />
                    </button>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {suppliers.length == 0 && <p className="noSuppliers">No hay proveedores guardados.</p>}
      </div>
    </main>
  );
}
