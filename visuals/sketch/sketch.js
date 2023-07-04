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
      })
  };
 
};

canvasSketch(sketch, settings);




