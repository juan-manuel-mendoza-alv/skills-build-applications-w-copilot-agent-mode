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

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const response = await fetch(getApiUrl('api/users/'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setUsers(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <p className="text-uppercase text-info fw-semibold mb-2">Users</p>
            <h2 className="h4 mb-0">Community profiles</h2>
          </div>
          <div className="text-muted small">Endpoint: {getApiUrl('api/users/')}</div>
        </div>

        {loading ? <div className="alert alert-light">Loading users…</div> : null}
        {error ? <div className="alert alert-danger">{error}</div> : null}

        {!loading && !error ? (
          <div className="row g-3">
            {users.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-secondary mb-0">No users have been registered yet.</div>
              </div>
            ) : (
              users.map((user, index) => (
                <div className="col-md-6" key={user?._id || `${user?.name || 'user'}-${index}`}>
                  <div className="border rounded-3 p-3 h-100">
                    <h3 className="h6 mb-1">{user?.name || user?.username || 'User'}</h3>
                    <p className="text-muted small mb-3">{user?.email || user?.role || 'Fitness enthusiast'}</p>
                    <div className="small text-muted">
                      <div>Team: {user?.team?.name || user?.team || 'Independent'}</div>
                      <div>Level: {user?.level || 'New'}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Users;
