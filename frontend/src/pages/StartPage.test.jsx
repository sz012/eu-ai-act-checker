import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import StartPage from './StartPage.jsx'
import { SCALE } from '../risk'

const renderPage = () => render(<MemoryRouter><StartPage /></MemoryRouter>)

describe('StartPage', () => {
  it('lists every risk tier in the scale motif', () => {
    renderPage()
    for (const tier of SCALE) {
      expect(screen.getByText(tier)).toBeInTheDocument()
    }
  })

  it('reveals the lede and the CTA only after the title finishes typing', async () => {
    const { container } = renderPage()

    //while the headline is still typing both are held back
    expect(container.querySelector('.hero-lede')).toHaveClass('is-waiting')
    expect(container.querySelector('.hero-actions')).toHaveClass('is-waiting')

    await waitFor(
      () => expect(container.querySelector('.hero-lede')).toHaveClass('is-in'),
      { timeout: 4000 },
    )
    //they come in together
    expect(container.querySelector('.hero-actions')).toHaveClass('is-in')
  })
})
