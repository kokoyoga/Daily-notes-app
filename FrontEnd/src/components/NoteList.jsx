import { useEffect, useState } from "react";
import axios from "axios";

function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/notes")
      .then((res) => {
        setNotes(res.data.data.notes);
      })
      .catch((err) => {
        console.error("Gagal fetch notes:", err);
      });
  }, []);

  return (
    <div>
      <h2>Daftar Catatan</h2>
      {notes.length === 0 ? (
        <p>Belum ada catatan.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong> - {note.body}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteList;
