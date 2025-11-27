import React, { useState } from 'react';
import config from './config';

export default function AddArticle() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [journalName, setJournalName] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [category, setCategory] = useState('');
  const [doi, setDoi] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = {
      title,
      author,
      journalName,
      publicationYear: parseInt(publicationYear, 10),
      category,
      doi,
    };

    try {
      const res = await fetch(`${config.apiBaseUrl}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });

      if (res.ok) {
        setMessage('Article added successfully ✅');
        setTitle('');
        setAuthor('');
        setJournalName('');
        setPublicationYear('');
        setCategory('');
        setDoi('');
      } else {
        setMessage('Failed to add article ❌');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Add Research Article</h2>
      <p className="card-description">
        Enter bibliographic details of a research article and save it to the journal database.
      </p>

      <form onSubmit={handleSubmit} className="form-grid">
        <input
          className="input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <div className="form-row-2">
          <input
            className="input"
            type="text"
            placeholder="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Journal Name"
            value={journalName}
            onChange={e => setJournalName(e.target.value)}
            required
          />
        </div>

        <div className="form-row-2">
          <input
            className="input"
            type="number"
            placeholder="Publication Year"
            value={publicationYear}
            onChange={e => setPublicationYear(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Category (e.g. AI, Networks)"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          />
        </div>

        <input
          className="input"
          type="text"
          placeholder="DOI (optional)"
          value={doi}
          onChange={e => setDoi(e.target.value)}
        />

        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Save Article
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-2 text-center text-muted">
          {message}
        </p>
      )}
    </div>
  );
}
