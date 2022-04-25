import { LayersControl, MapConsumer, MapContainer, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import useWindowDimensions from '../../hooks/use-windows-dimensions';
import TopMenu from '../../components/layout/TopMenu';
import { useTheme } from "@emotion/react";
import MainRaceMenu from "../../components/race/MainRaceMenu";
import AnimationControlPanel from "../../components/race/AnimationControlPanel";
import MapControl from "../../components/race/MapControl";
import useHttp from "../../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { raceActions } from "../../store/race";
import useAlertWrapper from "../../hooks/use-alert";

const RaceDetailStyle = {
    main: {
        flexShrink: 1,
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    map: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%'
    },
    mapContainer: {
        marginTop: '64px',
        width: '100%',
        height: 'calc(100% - 64px)'
    }
};

const menuWidth = 400;

const RaceDetail = () => {
    const [isOpened, setIsOpened] = useState(true);
    const theme = useTheme();
    const sm = theme.breakpoints.values.sm;
    const { width } = useWindowDimensions();
    const initialPosition = [50.0835494, 14.4341414];
    const { isLoading, sendRequest } = useHttp();
    const dispatch = useDispatch();
    const isAnimationOn = useSelector((state) => state.animation.isAnimationOn);
    const navigate = useNavigate();
    const alert = useAlertWrapper();
    const openMenuHandler = () => {
        setIsOpened(state => !state);
    }

    let { raceId } = useParams();

    useEffect(() => {
        sendRequest({ url: `https://localhost:5001/race/show/${raceId}`, responseType: 'empty' })
        .then((status) => {
                if(status){
                    if(status === 401 || status === 400){
                        alert.warning("Nemáte oprávnění zobrazit tento závod.")
                    }
                    return;
                }
                dispatch(raceActions.addId({ id: raceId }));
            });
    }, [raceId])

    useEffect(() => {
        dispatch({type: "reset-all"});
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', flex: 1 }}>
                <TopMenu isToggled={true} isRaceDetail={true} onOpenMenu={openMenuHandler} />
                <MainRaceMenu width={menuWidth} isSmall={width <= sm} isOpened={isOpened} onOpenMenu={openMenuHandler} />
                <Box sx={{ flexShrink: 1, display: 'flex', flexDirection: 'column', width: '100%', height: '100%', marginLeft: !isOpened && width > sm ? `-${menuWidth}px` : 0 }}>
                    <div style={RaceDetailStyle.main}>
                        <Box style={RaceDetailStyle.map}>
                            <MapContainer style={RaceDetailStyle.mapContainer} center={initialPosition} zoom={11}>
                                <MapConsumer>{(map) => { setTimeout(function () { map.invalidateSize() }, 200); return null; }}</MapConsumer>
                                <MapControl />
                            </MapContainer>
                        </Box>
                    </div>
                    <div style={{ display: isAnimationOn ? 'block' : 'none' }} >
                        <AnimationControlPanel />
                    </div>

                </Box>

            </Box>
        </>
    );
};

export default RaceDetail;