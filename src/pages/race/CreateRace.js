import { useNavigate } from "react-router-dom";
import CreateRaceForm from "../../components/dashboard/race/CreateRaceForm";
import useAuth from "../../hooks/use-auth";
import useHttp from "../../hooks/use-http";

const CreateRace = () => {
    const auth = useAuth();
    const { isLoading, sendRequest } = useHttp();
    const navigate = useNavigate();

    const handleCreateRace = (inputData) => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/Race/create`,
            method: 'POST',
            body: inputData,
            responseType: "text",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            navigate(`/ucet/editovat-zavod/${data}`);
        });
    }   

    return (
        <>
            <h1>Vytvořit závod</h1>
            <CreateRaceForm isCreate={true} onCreate={handleCreateRace} />
        </>
    );
};

export default CreateRace;