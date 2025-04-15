const { Router, json } = require("express");
const { authGuard } = require("../middleware/auth-guard");
const { validateBody } = require("../middleware/validate-body");
const { handleAsyncError } = require("../services/errors");
const { sendResponse } = require("../services/response");
const editSupplierPayload = require("../validators/suppliers");
const postSupplierPayload = require("../validators/suppliers");
const { editSupplier } = require("../use-cases/edit");
const { viewSupplier } = require("../use-cases/view-detail");
const { createSupplier } = require("../use-cases/add");
const { removeSupplier } = require("../use-cases/remove");
const { listSuppliers } = require("../use-cases/list");
const router = Router();

router.post(
    "/suppliers",
    json(),
    authGuard,
    validateBody(postSupplierPayload),
    handleAsyncError(async (req, res) => {
        await createSupplier(req.body);
        sendResponse(res, undefined, 201);
    })
);

router.get(
    "/suppliers/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        const supplier = await viewSupplier(req.params.id);
        sendResponse(res, supplier);
    })
);

router.get(
    "/suppliers/users/:userId",
    authGuard,
    handleAsyncError(async (req, res) => {
        const suppliers = await listSuppliers(req.params.userId);
        sendResponse(res, suppliers);
    })
);

router.put(
    "/suppliers/:id",
    json(),
    authGuard,
    validateBody(editSupplierPayload),
    handleAsyncError(async (req, res) => {
        await editSupplier(req.body, req.params.id);
        sendResponse(res);
    })
);

router.delete(
    "/suppliers/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        await removeSupplier(req.params.id);
        sendResponse(res);
    })
);

module.exports = router;