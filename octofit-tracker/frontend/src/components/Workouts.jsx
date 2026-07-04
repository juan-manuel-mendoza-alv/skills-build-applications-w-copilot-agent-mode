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

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('api/workouts/'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setWorkouts(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <p className="text-uppercase text-danger fw-semibold mb-2">Workouts</p>
            <h2 className="h4 mb-0">Planned routines and activities</h2>
          </div>
          <div className="text-muted small">Endpoint: {getApiUrl('api/workouts/')}</div>
        </div>

        {loading ? <div className="alert alert-light">Loading workouts…</div> : null}
        {error ? <div className="alert alert-danger">{error}</div> : null}

        {!loading && !error ? (
          <div className="row g-3">
            {workouts.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-secondary mb-0">No workouts have been planned yet.</div>
              </div>
            ) : (
              workouts.map((workout, index) => (
                <div className="col-md-6" key={workout?._id || `${workout?.name || 'workout'}-${index}`}>
                  <div className="border rounded-3 p-3 h-100">
                    <h3 className="h6 mb-1">{workout?.name || 'Workout'}</h3>
                    <p className="text-muted small mb-3">{workout?.description || 'A fresh routine to try.'}</p>
                    <div className="small text-muted">
                      <div>Focus: {workout?.focus || workout?.type || 'General fitness'}</div>
                      <div>Duration: {workout?.duration || workout?.minutes || 'Flexible'}</div>
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

export default Workouts;
