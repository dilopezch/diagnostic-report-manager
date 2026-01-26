import { lazy, Suspense } from 'react'
import FeatureErrorBoundary from '../components/FeatureErrorBoundary'
import LoadingFallback from '../components/LoadingFallback'

const ReportsList = lazy(() => import('../features/reports/ReportsList'))
const ReportUpload = lazy(() => import('../features/reports/ReportUpload'))

export default function Home() {
  return (
    <>
      <FeatureErrorBoundary featureName="Reports List">
        <Suspense fallback={<LoadingFallback message="Loading reports..." size="medium" />}>
          <ReportsList />
        </Suspense>
      </FeatureErrorBoundary>
      <FeatureErrorBoundary featureName="Report Upload">
        <Suspense fallback={<LoadingFallback message="Loading upload form..." size="small" />}>
          <ReportUpload />
        </Suspense>
      </FeatureErrorBoundary>
    </>
  )
}
