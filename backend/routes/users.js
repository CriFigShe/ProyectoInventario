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
const { viewUser } = require("../use-cases/view-detail");
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

router.post(
    "/users/login",
    json(),
    validateBody(loginPayload),
    handleAsyncError(async (req, res) => {
        const { email, password } = req.body;
        const token = await login(email, password);
        sendResponse(res, {
            token,
        });
    })
);

router.get(
    "/users/:id",
    handleAsyncError(async (req, res) => {
        const user = await viewUser(req.params.id);
        sendResponse(res, user);
    })
);

router.put(
    "/users",
    authGuard,
    validateBody(editUserPayload),
    handleAsyncError(async (req, res) => {
        await editUser(req.currentUser.id, req.body);
        sendResponse(res);
    })
);

module.exports = router;