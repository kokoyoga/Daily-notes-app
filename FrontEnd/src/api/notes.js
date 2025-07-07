import axios from "axios";

const BASE_URL = "http://localhost:3000"; // ganti jika pakai port berbeda

export const getNotes = async () => {
  const response = await axios.get(`${BASE_URL}/notes`);
  return response.data.data.notes;
};
export const createNote = (note) => axios.post(`${BASE_URL}/notes`, note);
export const deleteNote = (id) => axios.delete(`${BASE_URL}/notes/${id}`);
export const updateNote = (id, updatedNote) =>
  axios.put(`${BASE_URL}/notes/${id}`, updatedNote);
