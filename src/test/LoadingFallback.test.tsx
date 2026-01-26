import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingFallback, { LoadingSpinner } from '../components/LoadingFallback'

describe('LoadingFallback', () => {
  it('renders loading message with default props', () => {
    render(<LoadingFallback />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders custom loading message', () => {
    render(<LoadingFallback message="Loading reports..." />)
    expect(screen.getByText('Loading reports...')).toBeInTheDocument()
  })

  it('renders with small size', () => {
    const { container } = render(<LoadingFallback size="small" />)
    expect(container.querySelector('.h-20')).toBeInTheDocument()
  })

  it('renders with medium size by default', () => {
    const { container } = render(<LoadingFallback />)
    expect(container.querySelector('.h-40')).toBeInTheDocument()
  })

  it('renders with large size', () => {
    const { container } = render(<LoadingFallback size="large" />)
    expect(container.querySelector('.h-96')).toBeInTheDocument()
  })

  it('has proper ARIA label for accessibility', () => {
    render(<LoadingFallback />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })
})

describe('LoadingSpinner', () => {
  it('renders spinner with default medium size', () => {
    const { container } = render(<LoadingSpinner />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('h-6', 'w-6')
  })

  it('renders spinner with small size', () => {
    const { container } = render(<LoadingSpinner size="small" />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toHaveClass('h-4', 'w-4')
  })

  it('renders spinner with large size', () => {
    const { container } = render(<LoadingSpinner size="large" />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toHaveClass('h-8', 'w-8')
  })
})
