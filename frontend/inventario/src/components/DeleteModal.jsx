import { Modal, Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import "./DeleteModal.css";

export default function DeleteModal({ opened, onClose, onConfirm, itemName }) {
  const { t } = useTranslation();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("confirmRemoval")}
      centered
      className="deleteTitle"
    >
      <p className="deleteText">{t("confirmDeleteText", { name: itemName })}</p>
      <div className="buttons">
        <Button className="cancelButton" color="yellow" variant="white" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button className="confirmButton" color="yellow" variant="light" onClick={onConfirm}>
          {t("delete")}
        </Button>
      </div>
    </Modal>
  );
}
