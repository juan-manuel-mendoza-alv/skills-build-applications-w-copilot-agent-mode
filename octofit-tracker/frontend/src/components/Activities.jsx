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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        const response = await fetch(getApiUrl('api/activities/'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setActivities(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-2">Activities</p>
            <h2 className="h4 mb-0">Recent movement and progress</h2>
          </div>
          <div className="text-muted small">Endpoint: {getApiUrl('api/activities/')}</div>
        </div>

        {loading ? (
          <div className="alert alert-light" role="status">Loading activities…</div>
        ) : null}

        {error ? <div className="alert alert-danger">{error}</div> : null}

        {!loading && !error ? (
          <div className="row g-3">
            {activities.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-secondary mb-0">No activities available yet.</div>
              </div>
            ) : (
              activities.map((activity, index) => (
                <div className="col-md-6" key={activity?._id || `${activity?.type || 'activity'}-${index}`}>
                  <div className="border rounded-3 p-3 h-100">
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <h3 className="h6 mb-1">{activity?.type || 'Activity'}</h3>
                        <p className="text-muted small mb-0">
                          {activity?.description || 'Tracked activity from the backend'}
                        </p>
                      </div>
                      <span className="badge bg-primary-subtle text-primary">
                        {activity?.duration || activity?.minutes || 'Live'}
                      </span>
                    </div>
                    <div className="mt-3 small text-muted">
                      <div>User: {activity?.user?.name || activity?.user || 'Unknown'}</div>
                      <div>Date: {activity?.date || activity?.createdAt || 'Recently logged'}</div>
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

export default Activities;
