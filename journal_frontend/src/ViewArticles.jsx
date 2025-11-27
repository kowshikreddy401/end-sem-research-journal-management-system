import React, { useEffect, useState } from 'react';
import config from './config';

export default function ViewArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editArticle, setEditArticle] = useState(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/articles`);
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;

    try {
      const res = await fetch(`${config.apiBaseUrl}/articles/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id));
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.apiBaseUrl}/articles/${editArticle.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editArticle),
      });

      if (res.ok) {
        alert('Article updated!');
        setEditArticle(null);
        fetchArticles();
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="card">
      <h2 className="card-title">Articles Library</h2>
      <p className="card-description">
        Browse all research articles stored in the system. You can update or delete records when needed.
      </p>

      {editArticle && (
        <form onSubmit={handleUpdate} className="form-grid mt-3">
          <h3 className="card-title" style={{ fontSize: '1.1rem' }}>Edit Article</h3>

          <input
            className="input"
            type="text"
            placeholder="Title"
            value={editArticle.title}
            onChange={e => setEditArticle({ ...editArticle, title: e.target.value })}
            required
          />

          <div className="form-row-2">
            <input
              className="input"
              type="text"
              placeholder="Author"
              value={editArticle.author}
              onChange={e => setEditArticle({ ...editArticle, author: e.target.value })}
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Journal Name"
              value={editArticle.journalName}
              onChange={e => setEditArticle({ ...editArticle, journalName: e.target.value })}
              required
            />
          </div>

          <div className="form-row-2">
            <input
              className="input"
              type="number"
              placeholder="Publication Year"
              value={editArticle.publicationYear}
              onChange={e =>
                setEditArticle({ ...editArticle, publicationYear: parseInt(e.target.value, 10) })
              }
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Category"
              value={editArticle.category}
              onChange={e => setEditArticle({ ...editArticle, category: e.target.value })}
              required
            />
          </div>

          <input
            className="input"
            type="text"
            placeholder="DOI"
            value={editArticle.doi || ''}
            onChange={e => setEditArticle({ ...editArticle, doi: e.target.value })}
          />

          <div className="mt-3">
            <button type="submit" className="btn btn-primary">Update</button>{' '}
            <button type="button" className="btn btn-ghost" onClick={() => setEditArticle(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {articles.length === 0 ? (
        <p className="text-center mt-3 text-muted">No articles found.</p>
      ) : (
        <div className="table-wrapper mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Journal</th>
                <th>Year</th>
                <th>Category</th>
                <th>DOI</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id}>
                  <td>{article.id}</td>
                  <td>{article.title}</td>
                  <td>{article.author}</td>
                  <td>{article.journalName}</td>
                  <td>{article.publicationYear}</td>
                  <td>
                    <span className="badge">{article.category}</span>
                  </td>
                  <td>{article.doi || '-'}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ marginRight: '6px' }}
                      onClick={() => setEditArticle(article)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(article.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
