import React, { createContext, useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Button } from "@mui/material";
import useStateWithStorage from "../utils/useStateWithStorage";
export const ThemeContext = createContext("null");

function App() {
  const [theme, setTheme] = useStateWithStorage("theme", "light");

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  useEffect(() => {
    const theBody = document.getElementById("the-body")
    if (theme === "light") {
      theBody.classList.remove("theBody")
    } else {
      theBody.classList.add("theBody")
    }
  }, [theme])



  const [notes, setNotes] = useStateWithStorage('notes', []);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Header />
        <Button
          onClick={toggleTheme}
          checked={theme === "dark"}
          className="dark-switch"
          sx={{ color: "white" }}
          variant="text"
        >
          {theme === "dark" ? (
            <LightModeIcon
              onClick={toggleTheme}
            />
          ) : (
            <DarkModeIcon
              onClick={toggleTheme}
            />
          )}
        </Button>

        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
