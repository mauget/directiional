import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App component', () => {
    it('renders the main heading', () => {
        render(<App />)
        const heading = screen.getByRole('heading', { name: /get started/i })
        expect(heading).toBeInTheDocument()
    })

    it('renders hero images', () => {
        render(<App />)

        const reactLogo = screen.getByAltText('React logo')
        expect(reactLogo).toBeInTheDocument()

        const viteLogo = screen.getByAltText('Vite logo')
        expect(viteLogo).toBeInTheDocument()

        // Find the base image with empty alt text
        const images: HTMLImageElement[] = screen.getAllByRole('img') as HTMLImageElement[]
        const baseImg: HTMLImageElement | undefined = images.find(
            (img: HTMLImageElement) => img.alt === ''
        )
        expect(baseImg).toBeFalsy()
    })

    it('renders the counter button with initial value', () => {
        render(<App />)
        const button = screen.getByRole('button', { name: /count is 0/i })
        expect(button).toBeInTheDocument()
    })

    it('increments the counter when clicked', () => {
        render(<App />)

        const button = screen.getByRole('button', { name: /count is 0/i })
        fireEvent.click(button)

        const updatedButton = screen.getByRole('button', { name: /count is 1/i })
        expect(updatedButton).toBeInTheDocument()
    })

    it('renders documentation section with links', () => {
        render(<App />)

        const docsHeading = screen.getByRole('heading', { name: /documentation/i })
        expect(docsHeading).toBeInTheDocument()

        const exploreVite = screen.getByRole('link', { name: /explore vite/i })
        expect(exploreVite).toHaveAttribute('href', 'https://vite.dev/')

        const learnMore = screen.getByRole('link', { name: /learn more/i })
        expect(learnMore).toHaveAttribute('href', 'https://react.dev/')
    })

    it('renders social section with all links', () => {
        render(<App />)

        const socialHeading = screen.getByRole('heading', { name: /connect with us/i })
        expect(socialHeading).toBeInTheDocument()

        const expectedLinks: ReadonlyArray<{ name: RegExp; href: string }> = [
            { name: /github/i, href: 'https://github.com/vitejs/vite' },
            { name: /discord/i, href: 'https://chat.vite.dev/' },
            { name: /x\.com/i, href: 'https://x.com/vite_js' },
            { name: /bluesky/i, href: 'https://bsky.app/profile/vite.dev' },
        ]

        expectedLinks.forEach(({ name, href }) => {
            const link = screen.getByRole('link', { name })
            expect(link).toHaveAttribute('href', href)
        })
    })

    it('renders SVG icons', () => {
        render(<App />)

        const icons: SVGElement[] = screen.getAllByRole('presentation') as unknown as SVGElement[]
        expect(icons.length).toBeGreaterThan(0)
    })
})
