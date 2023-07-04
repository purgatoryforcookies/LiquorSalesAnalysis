import random from 'canvas-sketch-util/random'

class Node{
    constructor(id, position, style){
        this.id = id
        this.adjacents = []
        // this.position = position
        this.position = new MoveVector(position)
        this.style = style
        this.speed = 0.11
        this.vel = new MoveVector({x:random.range(-this.speed,this.speed), y:random.range(-this.speed,this.speed)})
        this.limit = 10
        
    }

    addAdjacent(node){
        this.adjacents.push(node)
    }

    isAdjacent(node){
        return this.adjacents.indexOf(node) > -1
    }

    getAdjacents(){
        return this.adjacents
    }

    draw(context) {

        context.save();
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.lineWidth = 0.8;
        context.strokeStyle = 'white';
        context.fillStyle = 'black';
        context.arc(0, 0, this.style.radius,0,Math.PI*2);
        context.fill();
        context.stroke();
        context.fillStyle = 'white';
        context.font = this.style.fontsize +'px arial';
        context.fillText(this.style.name, 0-(this.style.fontsize*4),-20);
        context.restore();
    
      }

    update() {
        this.position.x += this.vel.x;
        this.position.y += this.vel.y;
      }

    bounce() {
        if(this.position.x <= this.position.x_o - this.limit || this.position.x >= this.position.x_o + this.limit) this.vel.x *= -1;
        if(this.position.y <=  this.position.y_o - this.limit || this.position.y >=  this.position.y_o + this.limit ) this.vel.y *= -1;
      }




}


class MoveVector{
    constructor({x,y}){
        this.x = x
        this.y = y
        this.x_o = x
        this.y_o = y
    }
}




export {Node}