import './ChoiceOfLines.scss'
import { useInView } from "framer-motion"
import { useRef } from 'react';

function ChoiceOfLines({reverse = false, hidden = false}) {
    const ref = useRef(null)
    const isInView = useInView(ref)


    return (
        <svg 
        ref={ref}
        className = {isInView && !hidden ? 'active' : ''}
        width="100%" 
        height="76" 
        viewBox="0 0 405 76" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">

            <line 
            style={reverse && isInView && !hidden ? {strokeDashoffset: '156px'} : {}}
            x1="203.5" x2="203.5" y2="76" stroke="#E6E0E0" className="svg-elem-1"></line>
            <line 
            style={reverse && isInView && !hidden ? {strokeDashoffset: '814px'} : {}}
            x1="405" y1="57.5" x2="4.37114e-08" y2="57.5" stroke="#E6E0E0" className="svg-elem-2"></line>
        </svg>


    )
}

export default ChoiceOfLines