import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FeatureErrorBoundary from '../components/FeatureErrorBoundary'

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Feature error')
  }
  return <div>Feature content</div>
}

describe('FeatureErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error
  beforeAll(() => {
    console.error = vi.fn()
  })

  afterAll(() => {
    console.error = originalError
  })

  it('renders children when no error occurs', () => {
    render(
      <FeatureErrorBoundary featureName="Test Feature">
        <div>Feature works</div>
      </FeatureErrorBoundary>
    )
    expect(screen.getByText('Feature works')).toBeInTheDocument()
  })

  it('renders feature-specific error UI when error occurs', () => {
    render(
      <FeatureErrorBoundary featureName="Reports Upload">
        <ThrowError shouldThrow={true} />
      </FeatureErrorBoundary>
    )
    expect(screen.getByText('Reports Upload unavailable')).toBeInTheDocument()
    expect(
      screen.getByText('This feature is temporarily unavailable. Please try refreshing the page.')
    ).toBeInTheDocument()
  })

  it('displays correct feature name in error message', () => {
    render(
      <FeatureErrorBoundary featureName="Custom Feature Name">
        <ThrowError shouldThrow={true} />
      </FeatureErrorBoundary>
    )
    expect(screen.getByText('Custom Feature Name unavailable')).toBeInTheDocument()
  })

  it('logs error with feature name', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error')
    render(
      <FeatureErrorBoundary featureName="Test Feature">
        <ThrowError shouldThrow={true} />
      </FeatureErrorBoundary>
    )
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error in feature "Test Feature"'),
      expect.any(Error),
      expect.anything()
    )
  })
})
