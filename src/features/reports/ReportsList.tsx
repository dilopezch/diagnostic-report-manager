import { useEffect, useState, useMemo } from 'react'
import { useReportsStore } from '../../store/useReportsStore'

export default function ReportsList() {
  const { reports, loading, error, loadReports } = useReportsStore()
  const [query, setQuery] = useState('')

  useEffect(() => {
    loadReports()
  }, [loadReports])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return reports
    return reports.filter((r) => r.name.toLowerCase().includes(q))
  }, [query, reports])

  if (loading) {
    return (
      <div className="card">
        <p role="status" aria-live="polite">
          Loading reports...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <p
          style={{ color: 'red' }}
          role="alert"
          aria-live="assertive"
        >
          Error: {error}
        </p>
        <button
          onClick={loadReports}
          aria-label="Retry loading reports"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 id="reports-heading">Diagnostic Reports</h2>
      <div style={{ margin: '12px 0' }}>
        <label htmlFor="search-input" style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
          Search by Name
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter report name"
          aria-describedby="search-help"
          aria-controls="reports-table"
          style={{ padding: 8, width: '100%', maxWidth: 320 }}
        />
        <div id="search-help" style={{ fontSize: '0.875rem', color: '#666', marginTop: 4 }}>
          Filter reports by name. Showing {filtered.length} of {reports.length} reports.
        </div>
      </div>
      <table
        id="reports-table"
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}
        role="table"
        aria-labelledby="reports-heading"
      >
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th scope="col" style={{ padding: 8, textAlign: 'left' }}>ID</th>
            <th scope="col" style={{ padding: 8, textAlign: 'left' }}>Name</th>
            <th scope="col" style={{ padding: 8, textAlign: 'left' }}>Size</th>
            <th scope="col" style={{ padding: 8, textAlign: 'left' }}>Type</th>
            <th scope="col" style={{ padding: 8, textAlign: 'left' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((report) => (
            <tr key={report.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{report.id}</td>
              <td style={{ padding: 8 }}>{report.name}</td>
              <td style={{ padding: 8 }}>{report.size}</td>
              <td style={{ padding: 8 }}>{report.type}</td>
              <td style={{ padding: 8 }}>{report.date.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="reports-info" style={{ marginTop: 12, fontSize: '0.875rem', color: '#666' }}>
        Table shows diagnostic reports. Use search to filter by report name. Tab to navigate between cells.
      </div>
    </div>
  )
}
