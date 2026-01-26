import ReportsList from '../features/reports/ReportsList'
import ReportUpload from '../features/reports/ReportUpload'
import FeatureErrorBoundary from '../components/FeatureErrorBoundary'

export default function Home() {
  return (
    <>
      <FeatureErrorBoundary featureName="Reports List">
        <ReportsList />
      </FeatureErrorBoundary>
      <FeatureErrorBoundary featureName="Report Upload">
        <ReportUpload />
      </FeatureErrorBoundary>
    </>
  )
}
