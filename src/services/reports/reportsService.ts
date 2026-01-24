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
