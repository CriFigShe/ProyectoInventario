const { Router } = require("express");
const { authGuard } = require("../middleware/auth-guard");
const { validateBody } = require("../middleware/validate-body");
const { handleAsyncError } = require("../services/errors");
const { sendResponse } = require("../services/response");
const editEventPayload = require("../validators/events");
const postEventPayload = require("../validators/events");
const { editEvent } = require("../use-cases/edit");
const { viewEvent } = require("../use-cases/view-detail");
const { addEvent } = require("../use-cases/add");
const { deleteEvent } = require("../database/crud/events");
const { listEvents } = require("../use-cases/list");
const router = Router();

router.post(
    "/events",
    authGuard,
    validateBody(postEventPayload),
    handleAsyncError(async (req, res) => {
        await addEvent(req.body);
        sendResponse(res, undefined, 201);
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
    validateBody(editEventPayload),
    handleAsyncError(async (req, res) => {
        await editEvent(req.params.id, req.currentUser.id, req.body);
        sendResponse(res);
    })
);

router.delete(
    "/events/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        await deleteEvent(req.params.id);
        sendResponse(res);
    })
);

module.exports = router;