import './InfoSplash.scss'

import ChoiceOf from './subcomp/ChoiceOf'

function InfoSplash({hidden}:any) {
  return (
    <div className='infosplash__container'>
      
      <ChoiceOf title="Choice of Drink" best="Tomato Soup" least="Whiskey Sour 12 oz" hidden={hidden}/>
      <ChoiceOf title="Choice of Day" best="Monday" least="Friday" reverse={true} hidden={hidden}/>

    </div>
  )
}

export default InfoSplash