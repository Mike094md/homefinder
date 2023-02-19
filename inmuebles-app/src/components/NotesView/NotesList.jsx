import Note from "./Note";
import { useState, useEffect } from "react";
import noteService from "../services/notes";
import { Link, useNavigate } from "react-router-dom";
import HeaderNotes from "./HeaderNotes";
import NoteForm from "./NoteForm";
import Toggable from "./Toggable";
import ImagePicker from "./ImagePicker";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  }, []);

  // Queremos guardar el usuario loggeado si lo está
  useEffect(() => {
    /*const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }*/ 
  }, []);

  const addNote = (objectNote) => {
    noteService
      .create(objectNote)
      .then((response) => {
        setNotes(notes.concat(response));
      })
      .catch(() => alert("Algo salio mal en post"));
  };



  const toggleImportance = (id) => {
    const note = notes.find((note) => note.id === id);
    const nueva = { ...note, important: !note.important };
    noteService
      .update(id, nueva)
      .then((response) => {
        setNotes(notes.map((note) => (note.id !== id ? note : response)));
      })
      .catch((error) => {
        alert(`the note ${id} was already deleted from the server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <>
      
      <button
        className="btn btn-primary btn-sm m-4"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Importans" : "Show All"}
      </button>
      <h4 className="ms-4">
        {showAll ? "Todas las notas" : "Notas más importantes"}
      </h4>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              toggleImportance={toggleImportance}
            />
          );
        })}
      </ul>
      {user !== null ? (
          <NoteForm addNote={addNote} />
      ) : (
        <button className="btn btn-primary" style={{ margin: "0 0 2rem 2rem" }}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/login">
            Login
          </Link>
        </button>
      )}
    </>
  );
};

export default NotesList;
