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


  return (
    <div className="flex-2 w-full min-w-0">
      <div className="w-full">
        <label className="flex flex-col w-full">
          <div
            className="flex w-full items-stretch rounded-xl h-12 shadow-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group focus-within:ring-2 focus-within:ring-primary/20">
            <div className="text-slate-400 flex items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="form-input w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 placeholder:text-slate-400 px-4 text-base font-normal"
              placeholder="Search files, folders or shared assets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)} />
            <div className="flex items-center pr-2">
              <kbd
                className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">⌘K</kbd>
            </div>
          </div>
        </label>
      </div>
      <br></br>
      <div
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
        <div
          className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-lg">
            Files <span
              className="bg-primary/10 text-primary text-xs px-2.5 py-0.5 rounded-full font-medium">{reports.length} Total</span>
          </h3>

        </div>
        <div className="@container overflow-x-auto">
          {loading &&
            <div
              className="flex gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-green-900 dark:text-green-100">Loading reports... </p>
              </div>
            </div>
          }

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <th
                  className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider w-20">
                  ID</th>
                <th
                  className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Name</th>
                <th
                  className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider w-32">
                  Size</th>
                <th
                  className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider w-32">
                  Type</th>
                <th
                  className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider w-40">
                  Date</th>

              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4 text-slate-400 text-sm">{report.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-slate-900 dark:text-white font-semibold text-sm">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">{report.size}</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{report.type}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">{report.date.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
