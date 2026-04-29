import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setnotes] = useState([]);

  const fetchNotes = async () => {
    let { data } = await axios.get(
      "https://backend-2-hi6d.onrender.com/api/notes",
    );

    setnotes(data.notes);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    const postNotes = async () => {
      let { data } = await axios.post(
        "https://backend-2-hi6d.onrender.com/api/notes",
        {
          title: title.value,
          description: description.value,
        },
      );
      console.log(data);
      fetchNotes();
    };
    postNotes();
  };

  const deleteHandler = (noteId) => {
    const deleteNote = async () => {
      const { data } = await axios.delete(
        "https://backend-2-hi6d.onrender.com/api/notes/" + noteId,
      );
      console.log(data);
      fetchNotes();
    };
    deleteNote();
  };

  const updateHandler = (noteId) => {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description");
    const updateNote = async () => {
      let { data } = await axios.patch(
        `https://backend-2-hi6d.onrender.com/api/notes/${noteId}`,
        {
          title: newTitle,
          description: newDescription,
        },
      );
      console.log(data);
      fetchNotes();
    };
    updateNote();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="p-4">
      <form
        onSubmit={submitHandler}
        className="flex gap-5 flex-wrap px-3 py-5"
        action=""
      >
        <input
          className="w-80 border border-black p-2 rounded"
          type="text"
          name="title"
          id=""
        />
        <input
          className="w-80 border border-black p-2 rounded"
          type="text"
          name="description"
          id=""
        />
        <button className="px-5 py-2.5 bg-gray-700 text-white rounded active:scale-95">
          Create Note
        </button>
      </form>

      <div className="notes p-2 flex gap-5">
        {notes.map((note) => {
          return (
            <div className="note bg-gray-600 text-white p-4 w-fit rounded-2xl text-center">
              <h1 className="text-3xl font-bold">{note.title}</h1>
              <p className="text-xl">{note.description}</p>
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    deleteHandler(note._id);
                  }}
                  className="px-5 py-2.5 bg-white text-black rounded-2xl mt-2 active:scale-95"
                >
                  Delete Note
                </button>
                <button
                  onClick={() => {
                    updateHandler(note._id);
                  }}
                  className="px-5 py-2.5 bg-white text-black rounded-2xl mt-2 active:scale-95"
                >
                  Update Note
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
