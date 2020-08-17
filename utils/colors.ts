import { hexToHpluv, hsluvToRgb } from "hsluv"

export type ColorParam = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100

export type ColorFn<T> = (v: keyof T, p: ColorParam) => string

export const init = <T>() => {
    const toCSSRgb = (cs: [number, number, number]) => `rgb(${cs.map(c => Math.round(c * 255)).join(", ")})`

    return {
        withLightness: (t: T): ColorFn<T> => (v, l) => {
            const [h, s] = hexToHpluv(`${t[v]}`)
            return toCSSRgb(hsluvToRgb([h, s, l]))
        },
        withSaturation: (t: T): ColorFn<T> => (v, s) => {
            const [h, _, l] = hexToHpluv(`${t[v]}`)
            return toCSSRgb(hsluvToRgb([h, s, l]))
        },
        toCSSRgb
    }
}
