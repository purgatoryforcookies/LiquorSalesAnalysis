import { useEffect, useState } from 'react'
import './StatsRope.scss'



const stats = [
    { name: "Bottles", value: 23333 },
    { name: "Cans", value: 23333 },
    { name: "Bags", value: 23333 },
    { name: "Straws", value: 23333 },
    { name: "Cigarettes", value: 23333 },
    { name: "Cups", value: 23333 },
    { name: "Plastic", value: 23333 },
]

function StatsRope() {

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [screenWidth])




    const middleMan = (children: any) => {
        if (screenWidth < 1300) {
            return (
                <div className='statsRope__container'>
                    
                        {children}
                    
                </div>
            )
        }
        else {
            return (
                <div className='statsRope__container'>
                    {children}
                </div>
            )
        }
    }


    return middleMan(
        stats.map(stat => {
            return (
                <div key={stat.name} className="statBox">
                    <p>{stat.value}</p>
                    <p>{stat.name}</p>
                </div>
            )
        })
    )
}

export default StatsRope