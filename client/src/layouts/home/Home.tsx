import './Home.scss'

import DeckGL from '@deck.gl/react/typed';
import { HexagonLayer } from '@deck.gl/aggregation-layers/typed';
import { Map } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto/typed';
import { useCallback, useState } from 'react';
import { LinearInterpolator } from '@deck.gl/core/typed';
import InfoSplash from '../../components/infoSplash/InfoSplash';
import Hero from '../../components/hero/Hero';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import StatsRope from '../../components/statsRope/StatsRope';
import Timeline from '../../assets/svgComponents/timeline/Timeline';
import 'mapbox-gl/dist/mapbox-gl.css';


const INITIAL_VIEW_STATE = {
    longitude: -93.6465,
    latitude: 41.74002,
    zoom: 5,
    pitch: 60,
    bearing: 0
};


function Home() {

    const [viewState, updateViewState] = useState<Record<string, any>>(INITIAL_VIEW_STATE);
    const [hidden, setHidden] = useState<boolean>(false);

    const rotateCamera = useCallback(() => {
        updateViewState(v => ({
            ...v,
            bearing: v.bearing + 0.06,
            //   pitch: v.pitch,
            transitionDuration: 8,
            transitionInterpolator,
            onTransitionEnd: rotateCamera
        }));
    }, []);

    const transitionInterpolator = new LinearInterpolator();

    const layers = [new HexagonLayer({
        id: 'hexagon-layer',
        data: null,
        pickable: false,
        extruded: true,
        radius: 10000,
        elevationRange: [0, 9000],
        getPosition: d => d.COORDINATES,
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