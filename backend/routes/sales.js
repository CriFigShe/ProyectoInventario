const { Router, json } = require("express");
const { authGuard } = require("../middleware/auth-guard");
const { validateBody } = require("../middleware/validate-body");
const { handleAsyncError } = require("../services/errors");
const { sendResponse } = require("../services/response");
const editSalePayload = require("../validators/sales");
const postSalePayload = require("../validators/sales");
const { editSale } = require("../use-cases/edit");
const { viewSale } = require("../use-cases/view-detail");
const { createSale } = require("../use-cases/add");
const { removeSale } = require("../use-cases/remove");
const { listSales } = require("../use-cases/list");
const router = Router();

router.post(
    "/sales",
    json(),
    authGuard,
    validateBody(postSalePayload),
    handleAsyncError(async (req, res) => {
        await createSale(req.body);
        sendResponse(res, undefined, 201);
    })
);

router.get(
    "/sales/users/:userId",
    authGuard,
    handleAsyncError(async (req, res) => {
       const sales = await listSales(req.params.userId);
        sendResponse(res, sales);
    })
);

router.get(
    "/sales/:id",
    handleAsyncError(async (req, res) => {
        const sale = await viewSale(req.params.id);
        sendResponse(res, sale);
    })
);

router.put(
    "/sales/:id",
    json(),
    authGuard,
    validateBody(editSalePayload),
    handleAsyncError(async (req, res) => {
        await editSale(req.body, req.params.id);
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