import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Suspense } from 'react'
import SuspenseBoundary from '../components/SuspenseBoundary'

// Mock async component
const AsyncComponent = () => {
  return <div>Async content loaded</div>
}

describe('SuspenseBoundary', () => {
  it('renders children when loaded', async () => {
    render(
      <SuspenseBoundary>
        <AsyncComponent />
      </SuspenseBoundary>
    )
    expect(await screen.findByText('Async content loaded')).toBeInTheDocument()
  })

  it('shows loading fallback with custom message', () => {
    const NeverLoads = () => {
      throw new Promise(() => {}) // Never resolves
    }

    render(
      <SuspenseBoundary fallbackMessage="Loading custom...">
        <NeverLoads />
      </SuspenseBoundary>
    )
    
    expect(screen.getByText('Loading custom...')).toBeInTheDocument()
  })

  it('uses default loading message when not specified', () => {
    const NeverLoads = () => {
      throw new Promise(() => {})
    }

    render(
      <SuspenseBoundary>
        <NeverLoads />
      </SuspenseBoundary>
    )
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('passes size prop to LoadingFallback', () => {
    const NeverLoads = () => {
      throw new Promise(() => {})
    }

    const { container } = render(
      <SuspenseBoundary fallbackSize="large">
        <NeverLoads />
      </SuspenseBoundary>
    )
    
    expect(container.querySelector('.h-96')).toBeInTheDocument()
  })
})
