// Shared risk metadata used by the start motif and the results scale.
export const RISK_LABEL = {
  prohibited: 'Potentially prohibited',
  high: 'High risk',
  limited: 'Limited risk',
  minimal: 'Minimal risk',
  none: 'No AI systems found',
}

// Tiers ordered least → most severe (for the horizontal scale).
export const SCALE = ['minimal', 'limited', 'high', 'prohibited']

// Earthy, harmonised colours for the scale bars and system row accents.
export const SCALE_COLOR = {
  minimal: '#7d9a5f',
  limited: '#c9992f',
  high: '#bd6a3c',
  prohibited: '#8a3a34',
  none: '#c3bbab',
}

// Darker, readable colours for the risk labels.
export const RISK_TEXT = {
  minimal: '#3a4a20',
  limited: '#6e4e14',
  high: '#7c3a1c',
  prohibited: '#5e2420',
  none: '#756f62',
}
