import { Box } from "@mui/material";
import CreateRaceForm from "../../components/race/CreateRaceForm";
import UploadResultsForm from "../../components/race/UploadResultsForm";
import CustomAccordion from "../../components/UI/CustomAccordion";
import UploadedAlert from "../../components/UI/UploadedAlert";

const EditRace = () => {
    const handleUpdateRace = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <h1>Editovat závod</h1>
            <CreateRaceForm isCreate={false} onCreate={handleUpdateRace} />
            <Box sx={{
                width: "auto",
                maxWidth: 1050,
                flexGrow: 1,
            }}>
                <CustomAccordion header={<>Výsledky <UploadedAlert isSuccessful={true} text="Výsledky jsou nahrány!" /></>}>
                    <UploadResultsForm isUploaded={false} raceDate={Date.now()}/>
                </CustomAccordion>
                <CustomAccordion header={<>O - Mapa <UploadedAlert isSuccessful={false} text="Mapa NENÍ náhrana!" /></>}>
                </CustomAccordion>
                <CustomAccordion header={<>Tratě a kontroly <UploadedAlert isSuccessful={false} text="Tratě NEJSOU nahrány!" /></>}>
                </CustomAccordion>                
            </Box>

        </>
    );
};

export default EditRace;