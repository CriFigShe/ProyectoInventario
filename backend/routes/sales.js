const { Router } = require("express");
const { authGuard } = require("../middleware/auth-guard");
const { validateBody } = require("../middleware/validate-body");
const { handleAsyncError } = require("../services/errors");
const { sendResponse } = require("../services/response");
const editSalePayload = require("../validators/sales");
const postSalePayload = require("../validators/sales");
const { editSale } = require("../use-cases/edit");
const { viewSale } = require("../use-cases/view-detail");
const { addSale } = require("../use-cases/add");
const { removeSale } = require("../use-cases/remove");
const { listSales } = require("../use-cases/list");
const router = Router();

router.post(
    "/sales",
    authGuard,
    validateBody(postSalePayload),
    handleAsyncError(async (req, res) => {
        await addSale(req.body);
        sendResponse(res, undefined, 201);
    })
);

router.get(
    "/sales/:id",
    handleAsyncError(async (req, res) => {
        const sale = await viewSale(req.params.id);
        sendResponse(res, sale);
    })
);

router.get(
    "/sales",
    handleAsyncError(async (req, res) => {
        const sales = await listSales(req.currentUser?.id);
        sendResponse(res, sale);
    })
);

router.put(
    "/sales/:id",
    authGuard,
    validateBody(editSalePayload),
    handleAsyncError(async (req, res) => {
        await editSale(req.params.id, req.currentUser.id, req.body);
        sendResponse(res);
    })
);

router.delete(
    "/sales/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        await removeSale(req.params.id);
        sendResponse(res);
    })
);

module.exports = router;