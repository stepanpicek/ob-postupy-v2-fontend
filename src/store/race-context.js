import { createContext, useState, useEffect } from 'react';
import { AnimationContextProvider } from './animation-context';

const RaceContext = createContext({
    raceId: null,
    mapScale: 1,
    categoryId: null,
    courseId: null,
    mapTransparency: 99,
    addId: (id) => { },
    changeCourse: (courseId) => { },
    addMapScale: (mapScale) => { },
    changeMapTransparency: (mapTransparency) => { },
    changeCategory: (categoryId) => { }
});

export const RaceContextProvider = (props) => {
    const [raceId, setRaceId] = useState(null);
    const [mapScale, setMapScale] = useState(0);
    const [categoryId, setCategoryId] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [mapTransparency, setMapTransparency] = useState(100);

    const addId = (id) => {
        setRaceId(id);
    }

    const changeCourse = (courseId) => {
        setCourseId(courseId);
    }

    const addMapScale = (mapScale) => {
        setMapScale(mapScale);
    }

    const changeMapTransparency = (mapTransparency) => {
        setMapTransparency(mapTransparency);
    }

    const changeCategory = (categoryId) => {
        setCategoryId(categoryId);
    }

    return (
        <RaceContext.Provider value={{
            raceId: raceId,
            mapScale: mapScale,
            categoryId: categoryId,
            courseId: courseId,
            mapTransparency: mapTransparency,
            addId: addId,
            changeCourse: changeCourse,
            addMapScale: addMapScale,
            changeMapTransparency: changeMapTransparency,
            changeCategory: changeCategory
        }}>
            <AnimationContextProvider>
                {props.children}
            </AnimationContextProvider>
        </RaceContext.Provider>
    );
}

export default RaceContext;
