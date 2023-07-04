// const math = require('canvas-sketch-util/math');
import math from 'canvas-sketch-util/math'

export function mapLineWidth(score, data) {
    const arr = data.map(item=>item.Score)
    return math.mapRange(score, Math.min(...arr), Math.max(...arr), 0.1, 1)
}