import React from "react";
import Form from "react-bootstrap/Form";
import Toggable from "./Toggable";

export default function NoteForm({ addNote }) {
  const [newNote, setNewNote] = React.useState("");

  const createNote = (e) => {
    e.preventDefault();
    if (newNote === "") {
      alert("Debe escribir una nota!");
    } else {
      addNote({
        content: newNote,
        date: new Date(),
        important: Math.random() < 0.5,
      });
      setNewNote("");
    }
  };

  //style={{ width: "200px", margin: "2rem" }}

  return (
    <Toggable buttonLabel={"New note"}>
      <Form onSubmit={createNote}>
        <Form.Group className="mb-3">
          <Form.Label>Escribe una nueva nota</Form.Label>
          <Form.Control
            type="text"
            value={newNote}
            onChange={({ target }) => setNewNote(target.value)}
          />
        </Form.Group>
        <button className="btn btn-success" type="submit">
          Create
        </button>
      </Form>
    </Toggable>
  );
}
