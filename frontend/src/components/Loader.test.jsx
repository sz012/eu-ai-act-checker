import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Loader from './Loader.jsx'

describe('Loader', () => {
  afterEach(() => vi.useRealTimers())

  it('shows the label it was given', () => {
    render(<Loader label="Preparing your questionnaire…" />)
    expect(screen.getByText('Preparing your questionnaire…')).toBeInTheDocument()
  })

  it('only explains the cold start once loading drags on', () => {
    vi.useFakeTimers()
    render(<Loader />)

    expect(screen.queryByText(/free server is waking up/i)).not.toBeInTheDocument()
    act(() => vi.advanceTimersByTime(4000))
    expect(screen.getByText(/free server is waking up/i)).toBeInTheDocument()
  })
})
