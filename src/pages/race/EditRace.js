import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CreateRaceForm from "../../components/dashboard/race/CreateRaceForm";
import UploadCoursesForm from "../../components/dashboard/race/UploadCoursesForm";
import UploadMapForm from "../../components/dashboard/race/UploadMapForm";
import UploadResultsForm from "../../components/dashboard/race/UploadResultsForm";
import CustomAccordion from "../../components/UI/CustomAccordion";
import UploadedAlert from "../../components/UI/UploadedAlert";
import useAuth from "../../hooks/use-auth";
import useHttp from "../../hooks/use-http";

const EditRace = () => {
    let { raceId } = useParams();
    const auth = useAuth();
    const { isLoading, error, sendRequest } = useHttp();
    const [raceData, setRaceData] = useState(null);
    const [resultInfo, setResultInfo] = useState(null);
    const [mapInfo, setMapInfo] = useState(null);
    const [coursesInfo, setCoursesInfo] = useState(null);
    const navigate = useNavigate();
    const handleUpdateRace = (data) => {

    }

    useEffect(() => {
        updateData();
    }, [raceId]);

    const updateData = () => {
        sendRequest({
            url: `https://localhost:5001/Race/edit/${raceId}`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setRaceData(data);
        }).catch((error) => {
            navigate(`/ucet/vytvorit-zavod`);
        });
    }

    useEffect(() => {
        setResultInfo(getResultInfo());
        setMapInfo(getMapInfo());
        setCoursesInfo(getCoursesInfo());

    }, [raceData])

    const getResultInfo = () => {
        return {
            type: raceData?.results?.isUploaded ? "success" : "error",
            text: raceData?.results?.isUploaded ? "Výsledky jsou nahrány!" : "Výsledky NEJSOU nahrány!",
        }
    };

    const getMapInfo = () => {
        return {
            type: raceData?.map?.isUploaded && raceData?.map?.isCalibrated ? "success" :
                raceData?.map?.isUploaded ? "warning" : "error",
            text: raceData?.map?.isUploaded && raceData?.map?.isCalibrated ? "Mapa je nahraná!" :
                raceData?.map?.isUploaded ? "Mapa NENÍ zkalibrovaná!" : "Mapa NENÍ nahraná!",
        }
    };

    const getCoursesInfo = () => {
        return {
            type: raceData?.courseData?.isUploaded && raceData?.courseData?.areCoursesConnected ? "success" :
                raceData?.courseData?.isUploaded ? "warning" : "error",
            text: raceData?.courseData?.isUploaded && raceData?.courseData?.areCoursesConnected ? "Tratě jsou nahrány." :
                raceData?.courseData?.isUploaded ? "Tratě NEJSOU přiřazeny ke kategoriím!" : "Tratě NEJSOU nahrány.",
        }
    };

    return (
        <>
            <h1>Editovat závod</h1>
            <Typography variant="body2" my={1}>
                <b>Trvalý odkaz:</b> <NavLink to="/zavod/1">https://obpostupy.orientacnisporty.cz/zavod/{raceId}</NavLink>
            </Typography>
            <CreateRaceForm isCreate={false} onCreate={handleUpdateRace} raceData={raceData} />
            <Box sx={{
                width: "auto",
                maxWidth: 1050,
                flexGrow: 1,
            }}>
                <CustomAccordion header={<>Výsledky <UploadedAlert type={resultInfo?.type} text={resultInfo?.text} /></>}>
                    <UploadResultsForm isUploaded={raceData?.results?.isUploaded} raceDate={raceData?.date} raceId={raceId} onUpdate={updateData} />
                </CustomAccordion>
                <CustomAccordion header={<>O - Mapa <UploadedAlert type={mapInfo?.type} text={mapInfo?.text} /></>}>
                    <UploadMapForm isUploaded={raceData?.map?.isUploaded} isCalibrated={raceData?.map?.IsCalibrated} raceId={raceId}  onUpdate={updateData}/>
                </CustomAccordion>
                <CustomAccordion header={<>Tratě a kontroly <UploadedAlert type={coursesInfo?.type} text={coursesInfo?.text} /></>}>
                    <UploadCoursesForm isUploaded={raceData?.courseData?.isUploaded} raceId={raceId}  onUpdate={updateData} />
                </CustomAccordion>
            </Box>

        </>
    );
};

export default EditRace;