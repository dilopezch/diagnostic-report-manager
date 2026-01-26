import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getReports, uploadReport } from '../services/reports/reportsService'
import type { ReportModel } from '../types/ReportModel'

// Mock the JSON import
vi.mock('../services/reports/reports-mock.json', () => ({
  default: [
    { id: 1, name: 'test-report.pdf', size: '2.5MB', type: 'application/pdf', date: '2026-01-20' },
    { id: 2, name: 'diagnostic.csv', size: '1.2MB', type: 'text/csv', date: '2026-01-21' }
  ]
}))

describe('reportsService', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  describe('getReports', () => {
    it('returns an array of reports', async () => {
      const reports = await getReports()
      expect(Array.isArray(reports)).toBe(true)
      expect(reports.length).toBeGreaterThan(0)
    })

    it('returns reports with correct structure', async () => {
      const reports = await getReports()
      const report = reports[0]
      
      expect(report).toHaveProperty('id')
      expect(report).toHaveProperty('name')
      expect(report).toHaveProperty('size')
      expect(report).toHaveProperty('type')
      expect(report).toHaveProperty('date')
      expect(report.date).toBeInstanceOf(Date)
    })

    it('converts date strings to Date objects', async () => {
      const reports = await getReports()
      reports.forEach(report => {
        expect(report.date).toBeInstanceOf(Date)
      })
    })
  })

  describe('uploadReport', () => {
    it('uploads a file and returns a report model', async () => {
      const mockFile = new File(['content'], 'test-file.pdf', { type: 'application/pdf' })
      const result = await uploadReport(mockFile)
      
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name', 'test-file.pdf')
      expect(result).toHaveProperty('size')
      expect(result).toHaveProperty('type', 'application/pdf')
      expect(result).toHaveProperty('date')
      expect(result.date).toBeInstanceOf(Date)
    })

    it('generates unique ID for uploaded file', async () => {
      const mockFile = new File(['content'], 'file.txt', { type: 'text/plain' })
      const result = await uploadReport(mockFile)
      
      expect(typeof result.id).toBe('number')
      expect(result.id).toBeGreaterThan(0)
    })

    it('formats file size correctly for MB files', async () => {
      // Create a 2MB file
      const largeContent = new Array(2 * 1024 * 1024).fill('a').join('')
      const mockFile = new File([largeContent], 'large-file.pdf', { type: 'application/pdf' })
      const result = await uploadReport(mockFile)
      
      expect(result.size).toMatch(/^\d+\.\d+MB$/)
    })

    it('formats file size correctly for KB files', async () => {
      // Create a small file (< 1MB)
      const smallContent = 'small content'
      const mockFile = new File([smallContent], 'small-file.txt', { type: 'text/plain' })
      const result = await uploadReport(mockFile)
      
      expect(result.size).toMatch(/^\d+\.\d+KB$/)
    })

    it('preserves file name', async () => {
      const mockFile = new File(['content'], 'my-report.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
      const result = await uploadReport(mockFile)
      
      expect(result.name).toBe('my-report.docx')
    })

    it('preserves file type', async () => {
      const mockFile = new File(['content'], 'image.png', { type: 'image/png' })
      const result = await uploadReport(mockFile)
      
      expect(result.type).toBe('image/png')
    })

    it('sets current date for uploaded file', async () => {
      const mockFile = new File(['content'], 'file.txt', { type: 'text/plain' })
      const result = await uploadReport(mockFile)
      
      const today = new Date()
      const resultDate = new Date(result.date)
      
      // Check that the date is from today (comparing date strings to avoid timezone issues)
      const todayString = today.toISOString().split('T')[0]
      const resultString = resultDate.toISOString().split('T')[0]
      
      expect(resultString).toBe(todayString)
    })
  })
})
