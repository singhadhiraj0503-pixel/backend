import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setnotes] = useState([
    {
      title: "test title 1",
      description: "test description",
    },
    {
      title: "test title 2",
      description: "test description",
    },
    {
      title: "test title 3",
      description: "test description",
    },
    {
      title: "test title 4",
      description: "test description",
    },
  ]);

  const information = async () => {
    let { data } = await axios.get("http://localhost:3000/api/notes");

    setnotes(data.notes);
  };

  useEffect(() => {
    information();
  }, []);

  return (
    <div>
      <div className="notes p-2 flex gap-5">
        {notes.map((note) => {
          return (
            <div className="note bg-gray-600 text-white p-4 w-fit rounded-2xl">
              <h1 className="text-3xl font-bold">{note.title}</h1>
              <p className="text-xl">{note.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
