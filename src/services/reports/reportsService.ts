import { type ReportModel } from '../../features/reports/ReportModel'
import reportsData from './reports-mock.json'

export async function getReports(): Promise<ReportModel[]> {
  
  await new Promise((resolve) => setTimeout(resolve, 500))

  const reports: ReportModel[] = reportsData.map((item) => ({
    id: item.id,
    name: item.name,
    size: item.size,
    type: item.type,
    date: new Date(item.date),
  }))

  return reports
}

export async function uploadReport(file: File): Promise<ReportModel> {

  await new Promise((resolve) => setTimeout(resolve, 2000))
  
  const newId = Date.now()
  
  const sizeInMB = file.size / (1024 * 1024)
  const formattedSize = sizeInMB >= 1 
    ? `${sizeInMB.toFixed(1)}MB` 
    : `${(file.size / 1024).toFixed(1)}KB`
  
  const fileType = file.type;
  
  const today = new Date()
  const dateString = today.toISOString().split('T')[0]
  
  return {
    id: newId,
    name: file.name,
    size: formattedSize,
    type: fileType,
    date: new Date(dateString),
  }
}
