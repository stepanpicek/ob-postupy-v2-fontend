import CreateRaceForm from "../../components/race/CreateRaceForm";

const CreateRace = () => {
    const handleCreateRace = (event) => {
        event.preventDefault();
        console.log(event);
    }   

    return (
        <>
            <h1>Vytvořit závod</h1>
            <CreateRaceForm isCreate={true} onCreate={handleCreateRace} />
        </>
    );
};

export default CreateRace;