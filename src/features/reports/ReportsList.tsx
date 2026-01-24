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
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={loadReports}>Retry</button>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Diagnostic Reports</h2>
      <div style={{ margin: '12px 0' }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Name"
          style={{ padding: 8, width: '100%', maxWidth: 320 }}
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: 8, textAlign: 'left' }}>ID</th>
            <th style={{ padding: 8, textAlign: 'left' }}>Name</th>
            <th style={{ padding: 8, textAlign: 'left' }}>Size</th>
            <th style={{ padding: 8, textAlign: 'left' }}>Type</th>
            <th style={{ padding: 8, textAlign: 'left' }}>Date</th>
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
    </div>
  )
}
