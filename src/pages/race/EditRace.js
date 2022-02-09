import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import CreateRaceForm from "../../components/dashboard/race/CreateRaceForm";
import UploadCoursesForm from "../../components/dashboard/race/UploadCoursesForm";
import UploadMapForm from "../../components/dashboard/race/UploadMapForm";
import UploadResultsForm from "../../components/dashboard/race/UploadResultsForm";
import CustomAccordion from "../../components/UI/CustomAccordion";
import UploadedAlert from "../../components/UI/UploadedAlert";

const EditRace = () => {
    const handleUpdateRace = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <h1>Editovat závod</h1>
            <Typography variant="body2" my={1}>
                <b>Trvalý odkaz:</b> <NavLink to="/zavod/1">https://obpostupy.orientacnisporty.cz/zavod/1</NavLink>
            </Typography>
            <CreateRaceForm isCreate={false} onCreate={handleUpdateRace} />
            <Box sx={{
                width: "auto",
                maxWidth: 1050,
                flexGrow: 1,
            }}>
                <CustomAccordion header={<>Výsledky <UploadedAlert type="success" text="Výsledky jsou nahrány!" /></>}>
                    <UploadResultsForm isUploaded={false} raceDate={Date.now()} />
                </CustomAccordion>
                <CustomAccordion header={<>O - Mapa <UploadedAlert type="error" text="Mapa NENÍ náhrana!" /></>}>
                    <UploadMapForm isUploaded={false} isCalibrated={true} />
                </CustomAccordion>
                <CustomAccordion header={<>Tratě a kontroly <UploadedAlert type="warning" text="Tratě NEJSOU přiřazeny ke kategoriím!" /></>}>
                    <UploadCoursesForm isUploaded={TrustedTypePolicy} />
                </CustomAccordion>
            </Box>

        </>
    );
};

export default EditRace;