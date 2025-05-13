import "./ProductPage.css";
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

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState({});
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const [registerSucceed, setRegisterSucceed] = useState();

  const { t } = useTranslation();

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!currentUser.token) {
          navigate("/");
        }
        const productsResponse = await axios.get(
          `http://localhost:5000/products/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        const suppliersResponse = await axios.get(
          `http://localhost:5000/suppliers/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        const suppliersMap = {};
        suppliersResponse.data.data.forEach((supplier) => {
          suppliersMap[supplier.id] = supplier.name;
        });
        setSuppliers(suppliersMap);
        setProducts(productsResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, [currentUser]);

  useEffect(() => {
    if (registerSucceed !== undefined) {
      const timer = setTimeout(() => {
        setRegisterSucceed(undefined);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registerSucceed]);

  if (error) return <div>Error: {error}</div>;

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/products/${productToDelete.id}`, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      setRegisterSucceed(true);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setError(null);
    } catch (error) {
      setRegisterSucceed(false);
      setError(`Error al eliminar el producto: ${error}`);
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const renderTextWithEllipsis = (text) => (
    <span title={text} className="truncatedText">
      {text}
    </span>
  );

  return (
    <main className="productPage">
      <DeleteModal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteProduct}
        itemName={productToDelete?.name}
      />
      <div className="productsTitle">
        <h2>{t("products")}</h2>
        <Link to="/addProduct">
          <button className="addProduct">+</button>
        </Link>
      </div>
      <div className="notificationContainer">
        {registerSucceed == false && (
          <Notification
            icon={xIcon}
            color="red"
            title={t("errorRemovingProduct")}
            withCloseButton={false}
          />
        )}
        {registerSucceed == true && (
          <Notification
            icon={checkIcon}
            color="teal"
            title={t("succesRemovingProduct")}
            withCloseButton={false}
          />
        )}
      </div>
      <div>
        {products.length > 0 && (
          <div className="productsContainer">
            <div className="listTitles">
              <h3>{t("productName")}</h3>
              <h3>{t("productType")}</h3>
              <h3>{t("productStock")}</h3>
              <h3>{t("productCost")}</h3>
              <h3>{t("productPrice")}</h3>
              <h3>{t("productNotes")}</h3>
              <h3>{t("productSupplier")}</h3>
              <h3>{t("productActions")}</h3>
            </div>
            <div className="productsList">
              {products.map((product) => (
                <div key={product.id} className="productCard">
                  <p>{product.name}</p>
                  <p>{product.type}</p>
                  <p>{product.stock}</p>
                  <p>{product.cost}</p>
                  <p>{product.pvp}</p>
                  <p>{renderTextWithEllipsis(product.notes)}</p>
                  <p>{suppliers[product.supplierId]}</p>
                  <p>
                    <Link to={`/editProduct/${product.id}`}>
                      <button className="productActionButton">
                        <GoPencil />
                      </button>
                    </Link>
                    <button
                      className="productActionButton"
                      onClick={() => openDeleteModal(product)}
                    >
                      <CiTrash />
                    </button>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {products.length == 0 && (
          <p className="noProducts">{t("noProducts")}</p>
        )}
      </div>
    </main>
  );
}
