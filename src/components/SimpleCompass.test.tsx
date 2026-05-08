import { render, fireEvent } from '@testing-library/react'
import SimpleCompass from './SimpleCompass'
import type { SimpleCompassProps } from '../types/simpleCompassProps'
import { vi } from 'vitest'

describe('SimpleCompass', () => {
    const setup = (mapHeading: number = 0) => {
        const setMapHeading = vi.fn<(heading: number) => void>()
        const props: SimpleCompassProps = { mapHeading, setMapHeading }
        const { container } = render(<SimpleCompass {...props} />)

        // The MdNorth icon is the only SVG inside the wrapper
        // const svgIcon = screen.getByRole('img', {hidden: true}) as SVGSVGElement
        // const svgIcon = screen.getByTestId('mdnorth-icon', {hidden: true}) as SVGSVGElement
        const svgIcon = container.querySelector('svg');
        if (svgIcon) {
            const wrapper = svgIcon.parentElement as HTMLDivElement

            return {setMapHeading, svgIcon, wrapper}
        }
        throw('svgIcon not found')
    }

    it('renders the compass icon', () => {
        const { svgIcon } = setup()
        expect(svgIcon).toBeInTheDocument()
    })

    it('calls setMapHeading on click (rotation)', () => {
        const { setMapHeading, svgIcon, wrapper } = setup(0)

        // Mock bounding box for deterministic rotation math
        vi.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue({
            left: 0,
            top: 0,
            width: 300,
            height: 300,
            right: 300,
            bottom: 300,
            x: 0,
            y: 0,
            toJSON: () => {}
        })

        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            clientX: 300,
            clientY: 150
        })

        svgIcon.dispatchEvent(clickEvent)

        expect(setMapHeading).toHaveBeenCalledTimes(1)
        const heading = setMapHeading.mock.calls[0][0]
        expect(typeof heading).toBe('number')
    })

    it('resets heading to 0 on double-click', () => {
        const { setMapHeading, svgIcon } = setup(123)

        fireEvent.doubleClick(svgIcon)

        expect(setMapHeading).toHaveBeenCalledWith(0)
    })

    it('updates heading while dragging (mouse move with button pressed)', () => {
        const { setMapHeading, svgIcon, wrapper } = setup(0)

        vi.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue({
            left: 0,
            top: 0,
            width: 300,
            height: 300,
            right: 300,
            bottom: 300,
            x: 0,
            y: 0,
            toJSON: () => {}
        })

        const moveEvent = {
            bubbles: true,
            clientX: 200,
            clientY: 200,
            buttons: 1
        } as unknown as React.MouseEvent<Element>

        fireEvent.mouseMove(svgIcon, moveEvent)

        expect(setMapHeading).toHaveBeenCalled()
    })
})
