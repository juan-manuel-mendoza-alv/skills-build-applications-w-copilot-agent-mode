import { useEffect, useState } from 'react';
import { getApiUrl } from '../config/api';

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getApiUrl('api/leaderboard/'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setEntries(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <p className="text-uppercase text-warning fw-semibold mb-2">Leaderboard</p>
            <h2 className="h4 mb-0">Top performers</h2>
          </div>
          <div className="text-muted small">Endpoint: {getApiUrl('api/leaderboard/')}</div>
        </div>

        {loading ? <div className="alert alert-light">Loading leaderboard…</div> : null}
        {error ? <div className="alert alert-danger">{error}</div> : null}

        {!loading && !error ? (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-muted">No leaderboard entries available yet.</td>
                  </tr>
                ) : (
                  entries.map((entry, index) => (
                    <tr key={entry?._id || `${entry?.user?.name || 'entry'}-${index}`}>
                      <td>{entry?.rank || index + 1}</td>
                      <td>{entry?.user?.name || entry?.user || 'Unknown'}</td>
                      <td>{entry?.score || entry?.points || entry?.totalPoints || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Leaderboard;
