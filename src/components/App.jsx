import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // GET: Display all toys on page load
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // POST: Create a new toy
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  // PATCH: Increase likes
  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  }

  // DELETE: Donate/Remove a toy
  function handleDeleteToy(deletedToyId) {
    const updatedToys = toys.filter((toy) => toy.id !== deletedToyId);
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys} 
        onDeleteToy={handleDeleteToy} 
        onUpdateToy={handleUpdateToy} 
      />
    </>
  );
}

export default App;
