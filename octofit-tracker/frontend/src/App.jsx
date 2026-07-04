import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold mb-3">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Your modern fitness companion</h1>
              <p className="lead text-muted mb-4">
                Track workouts, grow your team, and climb the leaderboard from one polished dashboard.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a className="btn btn-primary btn-lg" href="https://react.dev/" target="_blank" rel="noreferrer">
                  Explore React
                </a>
                <a className="btn btn-outline-secondary btn-lg" href="http://localhost:8000" target="_blank" rel="noreferrer">
                  Open API
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
