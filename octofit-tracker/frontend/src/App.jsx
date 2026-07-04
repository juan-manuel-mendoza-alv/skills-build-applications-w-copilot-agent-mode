import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import { getApiBaseUrl, getCodespaceName } from './config/api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navItems = [
  { to: '/', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  const apiBaseUrl = getApiBaseUrl()
  const codespaceName = getCodespaceName()

  return (
    <main className="container py-4 py-lg-5">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-start mb-4">
                <div>
                  <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
                  <h1 className="display-6 fw-bold mb-2">React 19 presentation tier</h1>
                  <p className="lead text-muted mb-0">
                    Review users, teams, activities, workouts, and the leaderboard from one polished dashboard.
                  </p>
                </div>
                <div className="text-muted small fw-semibold">API base: {apiBaseUrl}</div>
              </div>

              <div className="alert alert-info d-flex flex-column flex-lg-row justify-content-between gap-2 mb-4" role="status">
                <span>
                  Define VITE_CODESPACE_NAME in .env.local when using GitHub Codespaces so the app targets the public API URL.
                </span>
                <span className="fw-semibold">Current value: {codespaceName || 'unset (using localhost fallback)'}</span>
              </div>

              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
