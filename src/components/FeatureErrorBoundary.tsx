import { type ReactNode } from 'react'
import { type ErrorInfo } from 'react'
import ErrorBoundary from './ErrorBoundary'

interface FeatureErrorBoundaryProps {
  children: ReactNode
  featureName: string
}

export default function FeatureErrorBoundary({ children, featureName }: FeatureErrorBoundaryProps) {
  const fallback = (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
      <div className="flex items-start gap-3">
        <svg
          className="h-5 w-5 text-orange-600 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-orange-900 mb-1">
            {featureName} unavailable
          </h4>
          <p className="text-sm text-orange-700">
            This feature is temporarily unavailable. Please try refreshing the page.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <ErrorBoundary 
      fallback={fallback}
      onError={(error: Error, errorInfo: ErrorInfo) => {
        console.error(`Error in feature "${featureName}":`, error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
