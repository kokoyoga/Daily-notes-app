const { addNoteHandler } = require("./handler/postNoteHandler");
const { getNoteHandler } = require("./handler/getNoteHandler");
const { deleteNoteHandler } = require("./handler/deleteNoteHandler");
const { putNoteHandler } = require("./handler/putNoteHandler");

const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getNoteHandler,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteHandler,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: putNoteHandler,
  },
];

module.exports = routes;
