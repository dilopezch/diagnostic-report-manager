import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ReportModel } from '../types/ReportModel'
import { getReports } from '../services/reports/reportsService'

type ReportsState = {
  reports: ReportModel[]
  loading: boolean
  error: string | null
  loadReports: () => Promise<void>
  addReport: (report: ReportModel) => void
}

export const useReportsStore = create<ReportsState>()(
  devtools(
    (set) => ({
      reports: [],
      loading: false,
      error: null,
      loadReports: async () => {
        set({ loading: true, error: null })
        try {
          const data = await getReports()
          set({ reports: data, loading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Error loading reports',
            loading: false 
          })
        }
      },
      addReport: (report) => set((state) => ({ 
        reports: [...state.reports, report] 
      })),
    }),
    { name: 'ReportsStore' }
  )
)
