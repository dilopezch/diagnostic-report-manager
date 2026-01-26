import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useReportsStore } from '../store/useReportsStore'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReportModel } from '../types/ReportModel'

// Mock the reports service
vi.mock('../services/reports/reportsService', () => ({
  getReports: vi.fn(() => 
    Promise.resolve([
      { id: 1, name: 'report1.pdf', size: '1MB', type: 'application/pdf', date: new Date('2026-01-20') },
      { id: 2, name: 'report2.csv', size: '500KB', type: 'text/csv', date: new Date('2026-01-21') }
    ])
  )
}))

describe('useReportsStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useReportsStore())
    act(() => {
      result.current.reports = []
      result.current.loading = false
      result.current.error = null
    })
  })

  it('has initial state with empty reports array', () => {
    const { result } = renderHook(() => useReportsStore())
    
    expect(result.current.reports).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('loadReports sets loading to true initially', async () => {
    const { result } = renderHook(() => useReportsStore())
    
    act(() => {
      result.current.loadReports()
    })
    
    expect(result.current.loading).toBe(true)
  })

  it('loadReports fetches and sets reports', async () => {
    const { result } = renderHook(() => useReportsStore())
    
    await act(async () => {
      await result.current.loadReports()
    })
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.reports).toHaveLength(2)
      expect(result.current.reports[0]).toHaveProperty('name', 'report1.pdf')
      expect(result.current.error).toBeNull()
    })
  })

  it('loadReports handles errors', async () => {
    // Mock a failed request
    const { getReports } = await import('../services/reports/reportsService')
    vi.mocked(getReports).mockRejectedValueOnce(new Error('Network error'))
    
    const { result } = renderHook(() => useReportsStore())
    
    await act(async () => {
      await result.current.loadReports()
    })
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('Network error')
    })
  })

  it('addReport adds a new report to the store', () => {
    const { result } = renderHook(() => useReportsStore())
    
    const newReport: ReportModel = {
      id: 3,
      name: 'new-report.pdf',
      size: '2MB',
      type: 'application/pdf',
      date: new Date('2026-01-22')
    }
    
    act(() => {
      result.current.addReport(newReport)
    })
    
    expect(result.current.reports).toHaveLength(1)
    expect(result.current.reports[0]).toEqual(newReport)
  })

  it('addReport prepends new report to existing reports', () => {
    const { result } = renderHook(() => useReportsStore())
    
    const report1: ReportModel = {
      id: 1,
      name: 'first.pdf',
      size: '1MB',
      type: 'application/pdf',
      date: new Date('2026-01-20')
    }
    
    const report2: ReportModel = {
      id: 2,
      name: 'second.pdf',
      size: '2MB',
      type: 'application/pdf',
      date: new Date('2026-01-21')
    }
    
    act(() => {
      result.current.addReport(report1)
      result.current.addReport(report2)
    })
    
    expect(result.current.reports).toHaveLength(2)
    // The store adds to the end of the array
    expect(result.current.reports[0]).toEqual(report1)
    expect(result.current.reports[1]).toEqual(report2)
  })

  it('multiple components can access the same store', () => {
    const { result: result1 } = renderHook(() => useReportsStore())
    const { result: result2 } = renderHook(() => useReportsStore())
    
    const newReport: ReportModel = {
      id: 1,
      name: 'shared-report.pdf',
      size: '1MB',
      type: 'application/pdf',
      date: new Date('2026-01-22')
    }
    
    act(() => {
      result1.current.addReport(newReport)
    })
    
    // Both hooks should see the same state
    expect(result1.current.reports).toEqual(result2.current.reports)
    expect(result2.current.reports).toHaveLength(1)
  })

  it('clears error when loadReports is called', async () => {
    const { result } = renderHook(() => useReportsStore())
    
    // Set an error state manually
    act(() => {
      useReportsStore.setState({ error: 'Previous error' })
    })
    
    await act(async () => {
      await result.current.loadReports()
    })
    
    await waitFor(() => {
      expect(result.current.error).toBeNull()
    })
  })
})
