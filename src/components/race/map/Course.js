import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import Finish from "./control/Finish";
import Start from "./control/Start";
import Control from "./control/Control";
import Line from "./control/Line";
import { angle } from "../../../services/geo";
import { raceActions } from "../../../store/race";

const Course = () => {
    const { isLoading, sendRequest } = useHttp();
    const course = useSelector((state) => state.race.course);
    const courseId = useSelector((state) => state.race.courseId);
    const mapScale = useSelector((state) => state.race.mapScale);
    const [courseData, setCourseData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!courseId) return;
        if (courseId < 0) {
            dispatch(raceActions.setCourse(null));
            return;
        }
        sendRequest({ url: `${process.env.REACT_APP_BACKEND_URI}/course/${courseId}` }, (data) => {
            //setCourse(data);
            dispatch(raceActions.setCourse(parseCourseData(data)));
        });
    }, [courseId]);

    useEffect(() => {
        drawCourse();
    }, [course])

    const parseCourseData = (data) => {
        if (!data || !data.controls) {
            setCourseData(null);
            return;
        }
        let ratio = mapScale / 15000;
        let courseData = [];
        let controls = data.controls.slice();
        controls.sort((a, b) => a.order - b.order);
        controls.forEach((control, index) => {
            let center = control.position;
            let radius = Math.ceil(40 * ratio);
            switch (control.type) {
                case 'Finish':
                    courseData.push({ id: control.id, type: control.type, center: center, radius: Math.ceil(50 * ratio) });
                    break;
                case 'Start':
                    courseData.push(getStart(center, controls, index, control, radius));
                    break;
                case 'Control':
                    courseData.push(
                        {
                            id: control.id,
                            type: control.type,
                            center: center,
                            radius: radius,
                            label: { number: control.order, angles: getAngles(center, controls, index) }
                        });
                    break;
            }
        });
        return courseData;
    }

    const getStart = (center, controls, index, control, radius) => {
        let controlForAngle = center;
        if (index < controls.length - 1) {
            controlForAngle = controls[index + 1].position;
        }
        else if (index > 0) {
            controlForAngle = controls[index - 1].position;
        }
        return { id: control.controlId, type: control.type, center: center, radius: radius, nextControl: controlForAngle };
    }

    const getAngles = (center, controls, index) => {
        let first, second = null;
        if (index > 0) {
            first = controls[index - 1].position;
        }
        if (index < controls.length - 1) {
            second = controls[index + 1].position;
        }
        return [angle(center, first), angle(center, second)];
    }

    const drawCourse = () => {
        if (!course) {
            setCourseData(null);
            return;
        }
        let courseData = [];
        course.forEach((control, index) => {
            switch (control.type) {
                case 'Finish':
                    courseData.push(<Finish key={control.id ?? index} radius={control.radius} center={control.center} />);
                    break;
                case 'Start':
                    courseData.push(<Start key={control.id ?? index} radius={control.radius} center={control.center} nextControl={control.nextControl} />);
                    break;
                case 'Control':
                    courseData.push(<Control key={control.id ?? index} radius={control.radius} center={control.center} label={control.label} />);
                    break;
            }
            if (index < course.length - 1) {
                let secondCenter = [course[index + 1].center[0], course[index + 1].center[1]];
                courseData.push(
                    <Line
                        key={`${control.id ?? index}-line`}
                        firstCenter={control.center}
                        secondCenter={secondCenter}
                        firstRadius={control.radius}
                        secondRadius={course[index + 1].radius}
                    />);
            }
        });
        setCourseData(courseData);
    }


    return (
        <>
            {courseData}
        </>);
}

export default Course;