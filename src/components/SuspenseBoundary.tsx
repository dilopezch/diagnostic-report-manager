import { type ReactNode, Suspense } from 'react'
import LoadingFallback from './LoadingFallback'

interface SuspenseBoundaryProps {
  children: ReactNode
  fallbackMessage?: string
  fallbackSize?: 'small' | 'medium' | 'large'
}

export default function SuspenseBoundary({ 
  children, 
  fallbackMessage = 'Loading...',
  fallbackSize = 'medium'
}: SuspenseBoundaryProps) {
  return (
    <Suspense fallback={<LoadingFallback message={fallbackMessage} size={fallbackSize} />}>
      {children}
    </Suspense>
  )
}
