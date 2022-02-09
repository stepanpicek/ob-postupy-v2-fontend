import { Box, Button, Grid, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react";
import { DatePicker } from "@mui/lab";
import ContentBox from "../../UI/ContentBox";

const CreateRaceForm = ({ isCreate, onCreate, raceData }) => {
    const [raceTypeMessage, setRaceTypeMessage] = useState('');
    const [raceDate, setRaceDate] = useState(null);

    const handleChangeTypeOfRace = (event) => {
        switch (event.target.value) {
            case "public":
                setRaceTypeMessage('Veřejný závod: závod viditelný pro všechny bez přihlášení');
                break;
            case "nonpublic":
                setRaceTypeMessage('Neveřejný závod: závod viditelný pouze pro toho, kdo má odkaz');
                break;
            case "private":
                setRaceTypeMessage('Soukromý závod: závod viditelný pouze pro tvůrce závodu');
                break;
        }
    }

    return (
        <ContentBox sx={{maxWidth: 1000}}>
            <Box component="form" onSubmit={onCreate}>
                <FormLabel id="race-type-radio-buttons-group">{isCreate ? "Vyberte typ závodu" : "Typ závodu"}</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="race-type-radio-buttons-group"
                    name="race-type-radio-buttons-group"
                    onChange={handleChangeTypeOfRace}
                >
                    <FormControlLabel value="public" control={<Radio />} label="Veřejný" />
                    <FormControlLabel value="nonpublic" control={<Radio />} label="Neveřejný" />
                    <FormControlLabel value="private" control={<Radio />} label="Soukromý" />
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
                            autoFocus
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