import './Home.scss'

import DeckGL from '@deck.gl/react/typed';
import { HexagonLayer } from '@deck.gl/aggregation-layers/typed';
import { Map } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto/typed';
import { useCallback, useEffect, useState } from 'react';
import { LinearInterpolator } from '@deck.gl/core/typed';
import InfoSplash from '../../components/infoSplash/InfoSplash';
import Hero from '../../components/hero/Hero';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import StatsRope from '../../components/statsRope/StatsRope';
import Timeline from '../../assets/svgComponents/timeline/Timeline';
import 'mapbox-gl/dist/mapbox-gl.css';
import data from '../../assets/data.json'



const INITIAL_VIEW_STATE = {
    longitude: -93.501691779026,
    latitude: 42.00199542737385,
    zoom: 7,
    pitch: 60,
    bearing: 0
};



function Home() {

    const [viewState, updateViewState] = useState<Record<string, any>>(INITIAL_VIEW_STATE);
    const [hidden, setHidden] = useState<boolean>(false);
    const isMobile = window.innerWidth < 600 ? false : true;


    const rotateCamera = useCallback(() => {
        if (!isMobile && !hidden) return
        updateViewState(v => ({
            ...v,
            bearing: v.bearing + 0.06,
            //   pitch: v.pitch,
            transitionDuration: 12,
            transitionInterpolator,
            onTransitionEnd: rotateCamera
        }));
    }, [hidden, isMobile]);

    

    const transitionInterpolator = new LinearInterpolator(); 

    

    const layers = [new HexagonLayer({
        id: 'hexagon-layer',
        data: data,
        pickable: false,
        colorRange: [
            [1, 152, 189],
            [73, 227, 206],
            [216, 254, 181],
            [254, 237, 177],
            [254, 173, 84],
            [209, 55, 78]
          ],
        extruded: true,
        radius: 200,
        coverage: 4,
        elevationRange: [0, 170000],
        getElevationScale: (d:{liters:number}) => d.liters,
        getPosition: d => d.coords,
    })];

    return (
        <div className={!hidden ? 'home__container' : 'home__container hidden'}>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={false}
                layers={layers}
                viewState={viewState}
                onAfterRender={rotateCamera}
                onViewStateChange={v => updateViewState(v.viewState)}
                style={{ zIndex: "-1", filter: "brightness(1)"}}
                
            >
                <Map mapStyle={BASEMAP.DARK_MATTER} />
            </DeckGL >
            <div className="eyeIcon" onClick={() => setHidden(!hidden)}>
                {hidden ? <AiFillEye color='white' /> : <AiFillEyeInvisible color='white' />}

            </div>
            <div className="home__content">
                <Hero />
                    <InfoSplash hidden={hidden} />
                    <StatsRope />
                <Timeline hidden={hidden} />
            </div>



        </div>
    )
}

export default Home