const { Router, json } = require("express");
const { authGuard } = require("../middleware/auth-guard");
const { validateBody } = require("../middleware/validate-body");
const { handleAsyncError } = require("../services/errors");
const { login } = require("../use-cases/login");
const { sendResponse } = require("../services/response");
const editProductPayload = require("../validators/products");
const postProductPayload = require("../validators/products");
const { editProduct } = require("../use-cases/edit");
const { viewProduct } = require("../use-cases/view-detail");
const { addProduct } = require("../database/crud/products");
const { deleteProduct } = require("../database/crud/products");
const { listProducts } = require("../use-cases/list");
const router = Router();

router.post(
    "/products",
    authGuard,
    validateBody(postProductPayload),
    handleAsyncError(async (req, res) => {
        await addProduct(req.body);
        sendResponse(res, undefined, 201);
    })
);

router.get(
    "/products/:id",
    handleAsyncError(async (req, res) => {
        const product = await viewProduct(req.params.id);
        sendResponse(res, product);
    })
);

router.get(
    "/products",
    handleAsyncError(async (req, res) => {
        const products = await listProducts(req.currentUser?.id);
        sendResponse(res, products);
    })
);

router.put(
    "/products/:id",
    authGuard,
    validateBody(editProductPayload),
    handleAsyncError(async (req, res) => {
        await editProduct(req.params.id, req.currentUser.id, req.body);
        sendResponse(res);
    })
);

router.delete(
    "/products/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        await deleteProduct(req.params.id);
        sendResponse(res);
    })
);

module.exports = router;