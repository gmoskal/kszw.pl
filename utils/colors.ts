import { hexToHpluv, hsluvToRgb } from "hsluv"

export type ColorParam = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100

export type ColorFn<T> = (v: keyof T, p: ColorParam) => string

export const init = <T>() => {
    const rgbToHex = (cs: [number, number, number]) => {
        const [r, g, b] = cs.map(c => Math.round(c * 255))
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }

    return {
        withLightness: (t: T): ColorFn<T> => (v, l) => {
            const [h, s] = hexToHpluv(`${t[v]}`)
            const r = rgbToHex(hsluvToRgb([h, s, l]))
            return r
        },
        withSaturation: (t: T): ColorFn<T> => (v, s) => {
            const [h, _, l] = hexToHpluv(`${t[v]}`)
            return rgbToHex(hsluvToRgb([h, s, l]))
        }
    }
}
