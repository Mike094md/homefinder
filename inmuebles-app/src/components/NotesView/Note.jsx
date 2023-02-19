

const Note = ({ note, toggleImportance, deleteNote }) => {
  const labelImportance = note.important ? "Important" : "Not important";

  return (
    <li>
      {note.content}
      <button
        className={`btn btn-${
          note.important ? "danger" : "secondary"
        } btn-sm ms-2`}
        onClick={() => toggleImportance(note.id)}
      >
        {labelImportance}
      </button>
    </li>
  );
};

export default Note;
