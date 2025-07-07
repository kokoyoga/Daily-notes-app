const notes = require("../notes");

const putNoteHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;

  // mencari index dari note yang akan diupdate
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
    };

    return h
      .response({
        status: "success",
        message: "Catatan berhasil diperbarui",
      })
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "Catatan gagal diperbarui. Id tidak ditemukan",
    })
    .code(404);
};

module.exports = {
  putNoteHandler,
};
