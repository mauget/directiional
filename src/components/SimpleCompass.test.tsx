import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from '../App'

// Strictly typed mock of SimpleCompass
vi.mock('./SimpleCompass.tsx', () => {
    const MockCompass = ({
                             mapHeading,
                             setMapHeading
                         }: {
        mapHeading: number
        setMapHeading: (n: number) => void
    }) => (
        <div>
            <p>MockCompass heading: {mapHeading}</p>
            <button onClick={() => setMapHeading(123)}>Set Heading From Child</button>
        </div>
    )
    return { default: MockCompass }
})

describe('App component', () => {
    it('renders initial heading text', () => {
        render(<App />)

        const heading = screen.getByRole('heading', { name: /pointing to/i })
        expect(heading).toBeInTheDocument()
        expect(heading.textContent).toContain('45')
    })

    it('renders the input with the current heading value', () => {
        render(<App />)

        const input = screen.getByRole('spinbutton') as HTMLInputElement
        expect(input.value).toBe('45')
    })

    it('updates heading when user types a new value', () => {
        render(<App />)

        const input = screen.getByRole('spinbutton') as HTMLInputElement

        fireEvent.change(input, { target: { value: '90' } })

        const heading = screen.getByRole('heading', { name: /pointing to/i })
        expect(heading.textContent).toContain('90')
    })

    it('wraps heading values using modulo 360', () => {
        render(<App />)

        const input = screen.getByRole('spinbutton') as HTMLInputElement

        fireEvent.change(input, { target: { value: '370' } })

        const heading = screen.getByRole('heading', { name: /pointing to/i })
        expect(heading.textContent).toContain('10')
    })

    it('passes mapHeading to SimpleCompass (mocked)', () => {
        render(<App />)

        const mockText = screen.getByText(/MockCompass heading:/i)
        expect(mockText.textContent).toContain('45')
    })

    it('updates heading when SimpleCompass calls setMapHeading', () => {
        render(<App />)

        const button = screen.getByRole('button', { name: /set heading from child/i })
        fireEvent.click(button)

        const heading = screen.getByRole('heading', { name: /pointing to/i })
        expect(heading.textContent).toContain('123')

        const input = screen.getByRole('spinbutton') as HTMLInputElement
        expect(input.value).toBe('123')
    })
})
