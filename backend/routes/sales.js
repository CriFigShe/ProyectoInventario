const { Router } = require("express");
const { authGuard } = require("../middleware/auth-guard");
const { validateBody } = require("../middleware/validate-body");
const { handleAsyncError } = require("../services/errors");
const { sendResponse } = require("../services/response");
const editSalePayload = require("../validators/sales");
const postSalePayload = require("../validators/sales");
const { editSale } = require("../use-cases/edit");