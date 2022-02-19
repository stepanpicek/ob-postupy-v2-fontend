import CreateRaceForm from "../../components/dashboard/race/CreateRaceForm";

const CreateRace = () => {
    const handleCreateRace = (event) => {
        event.preventDefault();
    }   

    return (
        <>
            <h1>Vytvořit závod</h1>
            <CreateRaceForm isCreate={true} onCreate={handleCreateRace} />
        </>
    );
};

export default CreateRace;