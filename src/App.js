import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        console.log(response.data);
        setRepositories(response.data)
      })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `teste ${Math.random()}`,
      "url": "www.google.com",
      "techs": ["a", "b"]
    });
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repos = repositories.filter(repo => repo.id !== id);
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo =>

          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
