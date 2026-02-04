import { lazy, Suspense } from 'react'
import FeatureErrorBoundary from '../components/FeatureErrorBoundary'
import LoadingFallback from '../components/LoadingFallback'
import SuspenseBoundary from '../components/SuspenseBoundary'

const ReportsList = lazy(() => import('../features/reports/ReportsList'))
const ReportUpload = lazy(() => import('../features/reports/ReportUpload'))

export default function Home() {
  return (
    <>
      <FeatureErrorBoundary featureName="Reports List">
        <SuspenseBoundary fallbackMessage='Loading list...' fallbackSize='small'>
          <ReportsList />
        </SuspenseBoundary>
      </FeatureErrorBoundary>
      <FeatureErrorBoundary featureName="Report Upload">
        <Suspense fallback={<LoadingFallback message="Loading upload form..." size="small" />}>
          <ReportUpload />
        </Suspense>
      </FeatureErrorBoundary>
    </>
  )
}
