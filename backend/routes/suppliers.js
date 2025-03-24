const { Router } = require("express");
const { authGuard } = require("../middleware/auth-guard");
const { validateBody } = require("../middleware/validate-body");
const { handleAsyncError } = require("../services/errors");
const { sendResponse } = require("../services/response");
const editSupplierPayload = require("../validators/suppliers");
const postSupplierPayload = require("../validators/suppliers");
const { editSupplier } = require("../use-cases/edit");
const { viewSupplier } = require("../use-cases/view-detail");
const { addSupplier } = require("../use-cases/add");
const { removeSupplier } = require("../use-cases/remove");
const { listSuppliers } = require("../use-cases/list");
const router = Router();

router.post(
    "/suppliers",
    authGuard,
    validateBody(postSupplierPayload),
    handleAsyncError(async (req, res) => {
        await addSupplier(req.body);
        sendResponse(res, undefined, 201);
    })
);

router.get(
    "/suppliers/:id",
    handleAsyncError(async (req, res) => {
        const supplier = await viewSupplier(req.params.id);
        sendResponse(res, supplier);
    })
);

router.get(
    "/suppliers",
    handleAsyncError(async (req, res) => {
        const suppliers = await listSuppliers(req.currentUser?.id);
        sendResponse(res, suppliers);
    })
);

router.put(
    "/suppliers/:id",
    authGuard,
    validateBody(editSupplierPayload),
    handleAsyncError(async (req, res) => {
        await editSupplier(req.params.id, req.currentUser.id, req.body);
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