const notes = require("../notes");

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;

  // mencari index dari note yang akan dihapus
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    return h
      .response({
        status: "success",
        message: "Catatan berhasil dihapus",
      })
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "Catatan gagal dihapus. Id tidak ditemukan",
    })
    .code(404);
};

module.exports = {
  deleteNoteHandler,
};
