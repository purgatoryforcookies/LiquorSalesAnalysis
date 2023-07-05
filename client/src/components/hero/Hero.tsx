import './Hero.scss'

function Hero() {
    return (
        <div className='hero__container'>

            <h1 id='title1'>Iowa</h1>
            <h1 id='title2'>Situation</h1>

            <p>
                Reactive data analysis on Iowa states liquor data.
                Dataset contains purchase information of Iowa Class “E” liquor
                licensees by product and date of purchase.
                <br />
                <br />
                Recommendation engine 1.0
            </p>


        </div>
    )
}

export default Hero