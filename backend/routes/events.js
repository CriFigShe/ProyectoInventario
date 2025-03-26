const { Router, json } = require("express");
const { authGuard } = require("../middleware/auth-guard");
const { validateBody } = require("../middleware/validate-body");
const { handleAsyncError } = require("../services/errors");
const { sendResponse } = require("../services/response");
const editEventPayload = require("../validators/events");
const postEventPayload = require("../validators/events");
const { editEvent } = require("../use-cases/edit");
const { viewEvent } = require("../use-cases/view-detail");
const { createEvent } = require("../use-cases/add");
const { removeEvent } = require("../use-cases/remove");
const { listEvents } = require("../use-cases/list");

////////////////////////////////////////////////////////////
const router = Router();

router.post(
    "/events",
    json(),
    authGuard,
    validateBody(postEventPayload),
    handleAsyncError(async (req, res) => {
        await createEvent(req.body);
        sendResponse(res);
    })
);

router.get(
    "/events/:id",
    handleAsyncError(async (req, res) => {
        const event = await viewEvent(req.params.id);
        sendResponse(res, event);
    })
);

router.get(
    "/events",
    handleAsyncError(async (req, res) => {
        const events = await listEvents(req.currentUser?.id);
        sendResponse(res, events)
    })
);

router.put(
    "/events/:id",
    authGuard,
    json(),
    validateBody(editEventPayload),
    handleAsyncError(async (req, res) => {
        await editEvent(req.body, req.params.id);
        sendResponse(res);
    })
);

router.delete(
    "/events/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        await removeEvent(req.params.id);
    sendResponse(res);
    })
);

module.exports = router;