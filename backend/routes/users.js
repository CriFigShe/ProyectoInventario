const { Router, json } = require("express");
const { authGuard } = require("../middleware/auth-guard");
const { validateBody } = require("../middleware/validate-body");
const { handleAsyncError } = require("../services/errors");
const { registerUser } = require("../use-cases/register");
const { login } = require("../use-cases/login");
const { sendResponse } = require("../services/response");
const registerPayload = require("../validators/register");
const loginPayload = require("../validators/login");
const editUserPayload = require("../validators/edit-user");
const { editUser } = require("../use-cases/edit");
const { viewUserById } = require("../use-cases/view-detail");
const { removeUser } = require("../use-cases/remove");

/////////////////////////////////////////////////////////////////////////
const router = Router();

router.post(
  "/users/register",
  json(),
  validateBody(registerPayload),
  handleAsyncError(async (req, res) => {
    await registerUser(req.body);
    sendResponse(res);
  })
);

router.get(
    "/users/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        const user = await viewUserById(req.params.id);
        sendResponse(res, user);
    })
);

router.put(
    "/users/:id",
    authGuard,
    json(),
    validateBody(editUserPayload),
    handleAsyncError(async (req, res) => {
        await editUser(req.params.id, req.body);
        sendResponse(res);
    })
);

router.delete(
    "/users/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        await removeUser(req.params.id);
        sendResponse(res);
    })
);

router.post(
    "/users/login",
    json(),
    validateBody(loginPayload),
    handleAsyncError(async (req, res) => {
        const token = await login(req.body.email, req.body.password);
        sendResponse(res, {
            token,
        });
    })
);

module.exports = router;