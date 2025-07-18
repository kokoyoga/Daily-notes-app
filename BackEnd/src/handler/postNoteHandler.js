const { nanoid } = require("nanoid");
const notes = require("../notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  // simpan catatan di array sementara
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  } else if (!isSuccess) {
    const response = h.response({
      status: "fail",
      message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
  }
};

module.exports = {
  addNoteHandler,
};
