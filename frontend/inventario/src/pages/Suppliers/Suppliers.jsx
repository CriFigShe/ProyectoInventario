import "./Suppliers.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { IconX, IconCheck } from "@tabler/icons-react";
import { Notification } from "@mantine/core";
import { useTranslation } from "react-i18next";
import DeleteModal from "../../components/DeleteModal";

import { CiTrash } from "react-icons/ci";
import { GoPencil } from "react-icons/go";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const [registerSucceed, setRegisterSucceed] = useState();

  const { t } = useTranslation();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        if (!currentUser.token) {
          navigate("/");
        }
        const response = await axios.get(
          `http://localhost:3000/suppliers/users/${currentUser.userId}`,
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

  const confirmDeleteSupplier = (supplier) => {
    setSupplierToDelete(supplier);
    setDeleteModalOpen(true);
  };

  const handleDeleteSupplier = async () => {
    if (!supplierToDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/suppliers/${supplierToDelete.id}`,
        {
          headers: {
            Authorization: `${currentUser.token}`,
          },
        }
      );
      setRegisterSucceed(true);
      setSuppliers(suppliers.filter((s) => s.id !== supplierToDelete.id));
      setError(null);
    } catch (error) {
      setRegisterSucceed(false);
      setError(`Error al eliminar el proveedor: ${error}`);
    } finally {
      setDeleteModalOpen(false);
      setSupplierToDelete(null);
    }
  };

  return (
    <main className="suppliersPage">
      <DeleteModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteSupplier}
        itemName={supplierToDelete?.name}
      />

      <div className="suppliersTitle">
        <h2>{t("suppliers")}</h2>
        <Link to="/addSupplier">
          <button className="addSupplier">+</button>
        </Link>
      </div>

      <div className="notificationContainer">
        {registerSucceed == false && (
          <Notification
            icon={xIcon}
            color="red"
            title={t("errorRemovingSupplier")}
            withCloseButton={false}
          />
        )}
        {registerSucceed == true && (
          <Notification
            icon={checkIcon}
            color="teal"
            title={t("successRemovingSupplier")}
            withCloseButton={false}
          />
        )}
      </div>
      <div>
        {suppliers.length > 0 && (
          <div className="suppliersContainer">
            <div className="listTitles">
              <h3>{t("supplierName")}</h3>
              <h3>{t("supplierContact")}</h3>
              <h3>{t("supplierActions")}</h3>
            </div>
            <div className="suppliersList">
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="supplierCard">
                  <p>{supplier.name}</p>
                  <p>{supplier.contact}</p>
                  <p>
                    <Link to={`/editSupplier/${supplier.id}`}>
                      <button className="supplierActionButton">
                        <GoPencil />
                      </button>
                    </Link>
                    <button
                      className="supplierActionButton"
                      onClick={() => confirmDeleteSupplier(supplier)}
                    >
                      <CiTrash />
                    </button>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {suppliers.length == 0 && (
          <p className="noSuppliers">{t("noSuppliers")}</p>
        )}
      </div>
    </main>
  );
}
