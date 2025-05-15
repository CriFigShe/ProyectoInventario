import "./Sales.css";
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

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const [registerSucceed, setRegisterSucceed] = useState();

  const { t } = useTranslation();

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  useEffect(() => {
    const fetchSales = async () => {
      try {
        if (!currentUser.token) {
          navigate("/");
        }
        const salesResponse = await axios.get(
          `http://localhost:5000/sales/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        const productsResponse = await axios.get(
          `http://localhost:5000/products/users/${currentUser.userId}`,
          {
            headers: {
              Authorization: `${currentUser.token}`,
            },
          }
        );
        const productsMap = {};
        productsResponse.data.data.forEach((product) => {
          productsMap[product.id] = Suppliers.name;
        });
        setProducts(productsMap);
        setSales(salesResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSales();
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

  const openDeleteModal = (sale) => {
    setSaleToDelete(sale);
    setShowDeleteModal(true);
  };

  const confirmDeleteSale = async () => {
    if (!saleToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/sales/${saleToDelete.id}`, {
        headers: {
          Authorization: `${currentUser.token}`,
        },
      });
      setRegisterSucceed(true);
      setSales(sales.filter((s) => s.id !== saleToDelete.id));
      setError(null);
    } catch (error) {
      setRegisterSucceed(false);
      setError(`Error al eliminar la venta: ${error}`);
    } finally {
      setShowDeleteModal(false);
      setSaleToDelete(null);
    }
  };

  const renderTextWithEllipsis = (text) => (
    <span title={text} className="truncatedText">
      {text}
    </span>
  );

  return (
    <main className="salePage">
      <DeleteModal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteSale}
        itemName={saleToDelete?.name}
      />
      <div className="salesTitle">
        <h2>{t("sales")}</h2>
        <Link to="/addSale">
          <button className="addSale">+</button>
        </Link>
      </div>
      <div className="notificationContainer">
        {registerSucceed == false && (
          <Notification
            icon={xIcon}
            color="red"
            title={t("errorRemovingSale")}
            withCloseButton={false}
          />
        )}
        {registerSucceed == true && (
          <Notification
            icon={checkIcon}
            color="teal"
            title={t("succesRemovingSale")}
            withCloseButton={false}
          />
        )}
      </div>
      <div>
        {sales.length > 0 && (
          <div className="salesContainer">
            <div className="listTitles">
              <h3>{t("saleDate")}</h3>
              <h3>{t("salePayment")}</h3>
              <h3>{t("saleTaxes")}</h3>
              <h3>{t("salePackagePrice")}</h3>
              <h3>{t("saleShippingPrice")}</h3>
              <h3>{t("saleProfit")}</h3>
              <h3>Productos</h3>
              <h3>{t("saleActions")}</h3>
            </div>
            <div className="salesList">
              {sales.map((sale) => (
                <div key={sale.id} className="saleCard">
                  <p>{sale.date}</p>
                  <p>{sale.payment}</p>
                  <p>{sale.taxes}</p>
                  <p>{sale.package_price}</p>
                  <p>{sale.shipping_price}</p>
                  <p>{sale.profit}</p>
                  {/* <p>{products[sale.productId]}</p> */}
                  <p>
                    <Link to={`/editSale/${sale.id}`}>
                      <button className="saleActionButton">
                        <GoPencil />
                      </button>
                    </Link>
                    <button
                      className="saleActionButton"
                      onClick={() => openDeleteModal(sale)}
                    >
                      <CiTrash />
                    </button>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {sales.length == 0 && (
          <p className="noSales">{t("noSales")}</p>
        )}
      </div>
    </main>
  );
}
