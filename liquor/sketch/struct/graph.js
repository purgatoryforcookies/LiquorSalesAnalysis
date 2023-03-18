import {Node} from './node'

class Graph{
    constructor(){
        this.nodes = new Map()
    }


    addVertex(value, position, style){
        if(this.nodes.has(value)){
            return this.nodes.get(value)
        }
        
        const vertex = new Node(value, position, style)
        this.nodes.set(value, vertex)
        return vertex
    }

    addEdge(source, destination, position, style){
        const sourceNode = this.addVertex(source, position, style)
        const destinationNode = this.addVertex(destination, position, style)

        sourceNode.addAdjacent(destinationNode)

        return [sourceNode, destinationNode]
    }



}

export {Graph}