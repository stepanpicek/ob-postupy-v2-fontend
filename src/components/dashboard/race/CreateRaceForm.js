import { Box, Button, Grid, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/lab";
import ContentBox from "../../UI/ContentBox";

const CreateRaceForm = ({ isCreate, onCreate, raceData }) => {
    const [raceTypeMessage, setRaceTypeMessage] = useState('');
    const [raceDate, setRaceDate] = useState("");
    const [raceName, setRaceName] = useState("");
    const [raceType, setRaceType] = useState();

    const handleChangeTypeOfRace = (event) => { 
        let type = event.target.value ;
        switch (type) {
            case "2":
                setRaceTypeMessage('Veřejný závod: závod viditelný pro všechny bez přihlášení');
                break;
            case "3":
                setRaceTypeMessage('Neveřejný závod: závod viditelný pouze pro toho, kdo má odkaz');
                break;
            case "1":
                setRaceTypeMessage('Soukromý závod: závod viditelný pouze pro tvůrce závodu');
                break;
        }        
        setRaceType(type);
    }

    useEffect(() => {
        if(raceData){
            if(raceData?.date) setRaceDate(raceData.date);
            if(raceData?.name) setRaceName(raceData.name);
            if(raceData?.type) setRaceType(`${raceData.type}`);
        }
    }, [raceData]);

    const handleCreateRace = (event) => {
        event.preventDefault();
        let data = {
            name: raceName,
            date: raceDate,
            type: parseInt(raceType)
        }
        onCreate(data);
    }

    return (
        <ContentBox sx={{maxWidth: 1000}}>
            <Box component="form" onSubmit={handleCreateRace}>
                <FormLabel id="race-type-radio-buttons-group">{isCreate ? "Vyberte typ závodu" : "Typ závodu"}</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="race-type-radio-buttons-group"
                    name="race-type-radio-buttons-group"
                    onChange={handleChangeTypeOfRace}                    
                >
                    <FormControlLabel value="2" control={<Radio />} label="Veřejný" checked={raceType == "2"}/>
                    <FormControlLabel value="3" control={<Radio />} label="Neveřejný" checked={raceType == "3"}/>
                    <FormControlLabel value="1" control={<Radio />} label="Soukromý" checked={raceType == "1"}/>
                </RadioGroup>
                <p>{raceTypeMessage}</p>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="raceName"
                            required
                            fullWidth
                            id="raceName"
                            label="Název závodu"
                            value={raceName}
                            onChange={(input) => {setRaceName(input.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            mask='__.__.____'
                            label="Datum závodu"
                            openTo="day"
                            views={['year', 'month', 'day']}
                            value={raceDate}
                            onChange={(newValue) => {
                                setRaceDate(newValue);
                            }}
                            renderInput={(params) => <TextField required fullWidth {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button type="submit" variant="contained" color="success" fullWidth>{isCreate ? "Vytvořit závod" : "Aktualizovat závod"}</Button>
                    </Grid>
                </Grid>
            </Box>
        </ContentBox>
    );
};

export default CreateRaceForm;