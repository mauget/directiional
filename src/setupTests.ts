import '@testing-library/jest-dom'

// Mock static assets (PNG, SVG, JPG, etc.)
vi.mock('./assets/react.svg', () => ({ default: 'react.svg' }))
vi.mock('./assets/vite.svg', () => ({ default: 'vite.svg' }))
vi.mock('./assets/hero.png', () => ({ default: 'hero.png' }))
