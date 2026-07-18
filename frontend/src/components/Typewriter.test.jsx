import { describe, it, expect, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import Typewriter from './Typewriter.jsx'

describe('Typewriter', () => {
  it('reserves the final space immediately, so the layout never jumps', () => {
    const { container } = render(<Typewriter text="Hello world" speed={1} />)
    expect(container.querySelector('.type-ghost')).toHaveTextContent('Hello world')
  })

  it('types the text out and reports when it has finished', async () => {
    const onDone = vi.fn()
    const { container } = render(<Typewriter text="Hello" speed={1} onDone={onDone} />)

    await waitFor(() => {
      expect(container.querySelector('.type-live')).toHaveTextContent('Hello')
    })
    expect(onDone).toHaveBeenCalled()
  })

  it('stays empty until start becomes true (used to chain the intro)', () => {
    const { container } = render(<Typewriter text="Hello" speed={1} start={false} />)
    expect(container.querySelector('.type-live').textContent).toBe('')
  })
})
