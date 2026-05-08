import { describe, it, expect } from 'vitest'
import radiansToDegrees from './radiansToDegrees'

describe('radiansToDegrees', () => {
    const closeTo = (value: number, expected: number, tolerance: number = 0.000001) => {
        expect(Math.abs(value - expected)).toBeLessThanOrEqual(tolerance)
    }

    it('converts 0 radians to 0 degrees', () => {
        const result: number = radiansToDegrees(0)
        expect(result).toBe(0)
    })

    it('converts π/2 radians to 90 degrees', () => {
        const result: number = radiansToDegrees(Math.PI / 2)
        closeTo(result, 90)
    })

    it('converts π radians to 180 degrees', () => {
        const result: number = radiansToDegrees(Math.PI)
        closeTo(result, 180)
    })

    it('converts 3π/2 radians to 270 degrees', () => {
        const result: number = radiansToDegrees((3 * Math.PI) / 2)
        closeTo(result, 270)
    })

    it('converts 2π radians to 360 degrees', () => {
        const result: number = radiansToDegrees(2 * Math.PI)
        closeTo(result, 360)
    })

    it('handles negative radians', () => {
        const result: number = radiansToDegrees(-Math.PI / 2)
        closeTo(result, -90)
    })

    it('handles values greater than 2π', () => {
        const result: number = radiansToDegrees(3 * Math.PI)
        closeTo(result, 540)
    })

    it('handles very small floating‑point values', () => {
        const tiny = 1e-10
        const result: number = radiansToDegrees(tiny)
        closeTo(result, tiny * 180 / Math.PI)
    })

    it('returns NaN when input is NaN', () => {
        const result: number = radiansToDegrees(Number.NaN)
        expect(Number.isNaN(result)).toBe(true)
    })
})
