const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

import { mapLineWidth } from './struct/nodeStyle';

import data from '../tmp.json'
import data2 from '../tmp2.json'
import data3 from '../tmp3.json'

import { Graph } from './struct/graph';

const settings = {
  // dimensions: [ 1080, 1080 ],
  animate: true

};

const graph = new Graph()

// console.log(data)

// console.log(data.map(item=>item.Score))

let baseRadius = 150
const additional_layer_gap = 130

const fontsize = 12


const sketch = ({ context, width, height }) => {

  for (let i = 0; i<data.length; i++){
    const item = data[i]
  
    const circleRadius = baseRadius
    const angle = (Math.PI*2)/(data.length)
    let x = Math.cos(angle*i)*circleRadius+(width/2);
    let y =  Math.sin(angle*i)*circleRadius+(height/2);
    const radius = 10
    // console.log(item.Score);
    // const score = math.mapRange(item.Score, 0.9748, 0.9877, 0.1, 1)
    const score = mapLineWidth(item.Score, data)
    const name = item.alc_2_title

    if (i==0){
      x=(width/2)-40
      y=(height/2)+10
    }
  
    graph.addEdge(item.AlcoholID1,item.AlcoholID2, {x, y}, {fontsize, radius, score, name})
  
  }

  for (let i = 0; i<data2.length; i++){
    const item = data2[i]
    const circleRadius = baseRadius+additional_layer_gap

    const angle = (Math.PI*2)/(data2.length)
    const x =  Math.cos(angle*i)*circleRadius+(width/2);
    const y =  Math.sin(angle*i)*circleRadius+(height/2);
    const radius = 7
    const score = mapLineWidth(item.Score*0.9, data2)
    const name = item.alc_2_title
  
    graph.addEdge(item.AlcoholID1,item.AlcoholID2, {x, y}, {fontsize, radius, score, name})
  
  }


  for (let i = 0; i<data3.length; i++){
    const item = data3[i]
    const circleRadius = baseRadius+(additional_layer_gap*2)

    const angle = (Math.PI*2)/(data3.length)
    const x =  Math.cos(angle*i)*circleRadius+(width/2);
    const y =  Math.sin(angle*i)*circleRadius+(height/2);
    const radius = 4
    const score = mapLineWidth(item.Score*0.8, data3)
    const name = item.alc_2_title
  
    graph.addEdge(item.AlcoholID1,item.AlcoholID2, {x, y}, {fontsize, radius, score, name})
  
  }



  return ({ context, width, height }) => {
    context.fillStyle = '#19191a';
    context.fillRect(0, 0, width, height);
    
    
      graph.nodes.forEach((value, key)=>{

        const parent = value
        const children = parent.getAdjacents()

        for (let i = 0; i<children.length; i++){

          const child = children[i]

          context.beginPath();
          context.strokeStyle = 'white';
          context.lineWidth = child.style.score;
          
          context.moveTo(parent.position.x, parent.position.y);
          context.lineTo(child.position.x, child.position.y);
          context.stroke();
          context.setLineDash([]);

        }
        parent.draw(context)
        // parent.update()
        // parent.bounce()
      })

      // context.save();
      // context.translate(width/2, height/2);
      // context.lineWidth = 0.15;
      // context.strokeStyle = '#ffffff';
      // context.setLineDash([5])
      // context.beginPath();
      // context.arc(0, 0, baseRadius,0,Math.PI*2);
      // context.arc(0, 0, baseRadius+additional_layer_gap,0,Math.PI*2);
      // context.arc(0, 0, baseRadius+(additional_layer_gap*2),0,Math.PI*2);
      // context.stroke();
      // context.restore();

    // agents.forEach(agent => {
    // agent.update();
    // agent.draw(context);
    // agent.bounce(bounce_limit, bounce_limit);
    

    // })

  };
 
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.x_start = x;
    this.y_start = y;
  }

  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx*dx + dy*dy);
  }


}



