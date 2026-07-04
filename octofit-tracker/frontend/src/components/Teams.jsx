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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrl('api/teams/'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setTeams(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <p className="text-uppercase text-success fw-semibold mb-2">Teams</p>
            <h2 className="h4 mb-0">Group dashboards and captains</h2>
          </div>
          <div className="text-muted small">Endpoint: {getApiUrl('api/teams/')}</div>
        </div>

        {loading ? <div className="alert alert-light">Loading teams…</div> : null}
        {error ? <div className="alert alert-danger">{error}</div> : null}

        {!loading && !error ? (
          <div className="row g-3">
            {teams.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-secondary mb-0">No teams are available yet.</div>
              </div>
            ) : (
              teams.map((team, index) => (
                <div className="col-md-6" key={team?._id || `${team?.name || 'team'}-${index}`}>
                  <div className="border rounded-3 p-3 h-100">
                    <h3 className="h6 mb-1">{team?.name || 'Team'}</h3>
                    <p className="text-muted small mb-3">{team?.description || 'The team is ready for new challenges.'}</p>
                    <div className="small text-muted">
                      <div>Captain: {team?.captain?.name || team?.captain || 'Unassigned'}</div>
                      <div>Members: {team?.members?.length || team?.memberCount || 0}</div>
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

export default Teams;
