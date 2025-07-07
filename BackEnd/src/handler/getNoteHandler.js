const notes = require("../notes");

const getNoteHandler = (request, h) => {
  if (notes.length === 0) {
    return h
      .response({
        status: "fail",
        message: "Belum ada catatan yang tersedia",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      data: { notes },
    })
    .code(200);
};

module.exports = {
  getNoteHandler,
};
