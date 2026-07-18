import { describe, it, expect } from 'vitest'
import { RISK_LABEL, SCALE, SCALE_COLOR, RISK_TEXT } from './risk'

describe('risk metadata', () => {
  it('orders the scale from least to most severe', () => {
    expect(SCALE).toEqual(['minimal', 'limited', 'high', 'prohibited'])
  })

  it('has a colour and a text colour for every tier on the scale', () => {
    for (const tier of SCALE) {
      expect(SCALE_COLOR[tier]).toMatch(/^#[0-9a-f]{6}$/i)
      expect(RISK_TEXT[tier]).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it('has a human-readable label for every tier, plus the empty state', () => {
    for (const tier of [...SCALE, 'none']) {
      expect(RISK_LABEL[tier]).toBeTruthy()
    }
  })

  it('covers the "none" case in the colour maps too', () => {
    expect(SCALE_COLOR.none).toBeTruthy()
    expect(RISK_TEXT.none).toBeTruthy()
  })
})
