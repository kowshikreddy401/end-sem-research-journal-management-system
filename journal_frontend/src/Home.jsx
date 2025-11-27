import React, { useEffect, useState } from 'react';
import config from './config';

export default function Home() {
  const [message, setMessage] = useState('Checking backend...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${config.apiBaseUrl}/articles/health`);
        const text = await res.text();
        setMessage(text);
      } catch {
        setMessage('Backend not reachable');
      } finally {
        setLoading(false);
      }
    };
    checkHealth();
  }, []);

  return (
    <div className="card">
      <h2 className="card-title">Welcome</h2>
      <p className="card-description">
        This portal helps you manage research journal articles — add new entries, update
        existing records, and maintain a clean bibliography for projects or publications.
      </p>
      <p className="mt-2">
        <strong>Status:</strong>{' '}
        <span className="text-muted">
          {loading ? 'Checking...' : message}
        </span>
      </p>
    </div>
  );
}
