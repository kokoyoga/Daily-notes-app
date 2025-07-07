import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/notes");
      setNotes(response.data.data.notes);
    } catch (error) {
      console.error("Gagal ambil catatan:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      title,
      tags: tags.split(",").map((tag) => tag.trim()),
      body,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/notes/${editId}`, noteData);
      } else {
        await axios.post("http://localhost:3000/notes", noteData);
      }

      setTitle("");
      setTags("");
      setBody("");
      setEditId(null);
      fetchNotes();
    } catch (error) {
      console.error("Gagal mengirim catatan:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Gagal menghapus catatan:", error);
    }
  };

  const startEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setTags(note.tags.join(", "));
    setBody(note.body);
  };

  return (
    <div className="flex justify-center bg-zinc-900 min-h-screen p-6 text-white">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Catatan Harian</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <Input
            type="text"
            placeholder="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Tags (pisahkan dengan koma)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />

          <Textarea
            placeholder="Isi catatan"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />

          <div className="flex items-center gap-4">
            <Button type="submit" className="w-fit">
              {editId ? "Simpan Perubahan" : "Tambah Catatan"}
            </Button>
            {editId && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setEditId(null);
                  setTitle("");
                  setTags("");
                  setBody("");
                }}
              >
                Batal Edit
              </Button>
            )}
          </div>
        </form>

        {/* List Catatan */}
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-zinc-800 rounded-xl shadow-md space-y-2 border border-zinc-700"
            >
              <h2 className="text-xl font-semibold break-words">
                {note.title}
              </h2>
              <p className="text-sm text-zinc-400 break-words">
                Tags: {note.tags.join(", ")}
              </p>
              <p className="text-sm break-words whitespace-pre-wrap line-clamp-5">
                {note.body}
              </p>

              <div className="flex gap-2 mt-3">
                <Button
                  onClick={() => startEdit(note)}
                  className="text-yellow-400 hover:text-yellow-500 text-sm"
                  variant="ghost"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-400 hover:text-red-500 text-sm"
                  variant="ghost"
                >
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
