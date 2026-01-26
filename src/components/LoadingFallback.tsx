interface LoadingFallbackProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
}

export default function LoadingFallback({ 
  message = 'Loading...', 
  size = 'medium' 
}: LoadingFallbackProps) {
  const sizeClasses = {
    small: 'h-20',
    medium: 'h-40',
    large: 'h-96'
  }

  const spinnerSizes = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16'
  }

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
      <div className="flex flex-col items-center gap-3">
        <div
          className={`${spinnerSizes[size]} animate-spin rounded-full border-4 border-slate-200 border-t-blue-600`}
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-slate-600">{message}</p>
      </div>
    </div>
  )
}

export function LoadingSpinner({ size = 'medium' }: Pick<LoadingFallbackProps, 'size'>) {
  const spinnerSizes = {
    small: 'h-4 w-4 border-2',
    medium: 'h-6 w-6 border-2',
    large: 'h-8 w-8 border-3'
  }

  return (
    <div
      className={`${spinnerSizes[size]} animate-spin rounded-full border-slate-200 border-t-blue-600`}
      role="status"
      aria-label="Loading"
    />
  )
}
