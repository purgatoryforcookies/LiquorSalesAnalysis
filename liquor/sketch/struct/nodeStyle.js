// const math = require('canvas-sketch-util/math');
import math from 'canvas-sketch-util/math'

export function mapLineWidth(score, data) {
    const arr = data.map(item=>item.Score)

    // console.log(Math.min(...arr), Math.max(...arr))
    
    return math.mapRange(score, Math.min(...arr), Math.max(...arr), 0.1, 1)



    
}