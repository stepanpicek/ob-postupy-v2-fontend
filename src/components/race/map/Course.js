import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import Finish from "./control/Finish";
import Start from "./control/Start";
import Control from "./control/Control";
import Line from "./control/Line";
import { angle } from "../../../services/geo";

const Course = () => {
    const { isLoading, error, sendRequest } = useHttp();
    const [course, setCourse] = useState(null);
    const courseId = useSelector((state) => state.race.courseId);
    const mapScale = useSelector((state) => state.race.mapScale);

    useEffect(() => {
        if (!courseId) return;
        if(courseId < 0){
            setCourse(null);
            return;
        }
        sendRequest({ url: `https://localhost:44302/courses/get?id=${courseId}` }, (data) => {
            setCourse(data);
        });
    }, [courseId]);

    const drawCourse = () => {
        if (!course || !course.courseControl) return <></>;
        let ratio = mapScale / 15000;
        let courseData = [];
        let controls = course.courseControl;
        controls.sort((a, b) => a.order - b.order);
        controls.forEach((control, index) => {
            let center = [control.control.coordinates.item1, control.control.coordinates.item2];
            let radius = Math.ceil(40 * ratio);
            switch (control.type) {
                case 'Finish':
                    courseData.push(<Finish key={control.controlId} radius={radius} center={center} />);
                    break;
                case 'Start':
                    courseData.push(getStart(center, controls, index, control, radius));
                    break;
                case 'Control':
                    courseData.push(
                        <Control
                            key={control.controlId}
                            radius={radius}
                            center={center}
                            label={{ number: control.order, angles: getAngles(center, controls, index) }} />);
                    break;
            }
            if (index < controls.length - 1) {
                let secondCenter = [controls[index + 1].control.coordinates.item1, controls[index + 1].control.coordinates.item2];
                courseData.push(<Line key={`${control.controlId}-line`} firstCenter={center} secondCenter={secondCenter} firstRadius={radius} secondRadius={radius} />);
            }
        });

        return courseData;
    }

    const getStart = (center, controls, index, control, radius) => {
        let controlForAngle = center;
        if (index < controls.length - 1) {
            controlForAngle = [controls[index + 1].control.coordinates.item1, controls[index + 1].control.coordinates.item2];
        }
        else if (index > 0) {
            controlForAngle = [controls[index - 1].control.coordinates.item1, controls[index - 1].control.coordinates.item2];
        }
        return <Start key={control.controlId} radius={radius} center={center}
            nextControl={controlForAngle} />;
    }

    const getAngles = (center, controls, index) => {
        let first, second = null;
        if (index > 0) {
            first = [controls[index - 1].control.coordinates.item1, controls[index - 1].control.coordinates.item2];
        }
        if (index < controls.length - 1) {
            second = [controls[index + 1].control.coordinates.item1, controls[index + 1].control.coordinates.item2];
        }
        return [angle(center, first), angle(center, second)];
    }

    return (
        <>
            {drawCourse()}
        </>);
}

export default Course;