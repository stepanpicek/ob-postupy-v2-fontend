import { Button, Divider, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import FileDropzone from "../../UI/FileDropzone";

const ORIS_DATA_MOCK = {
    "Event_5295": { "ID": "5295", "Name": "\u017deb\u0159\u00ed\u010dek B-\u010cechy z\u00e1pad", "Date": "2021-09-04", "Org1": { "ID": "94", "Abbr": "LTP", "Name": "OOB TJ Lokomotiva Teplice" }, "Org2": [], "Region": "\u010c", "Regions": { "Region_\u010c": { "ID": "\u010c", "Name": "\u010cechy" } }, "Sport": { "ID": "1", "NameCZ": "OB", "NameEN": "Foot O" }, "Discipline": { "ID": "1", "ShortName": "KL", "NameCZ": "Klasick\u00e1 tra\u0165", "NameEN": "Long distance" }, "Level": { "ID": "3", "ShortName": "\u017dB", "NameCZ": "\u017deb\u0159\u00ed\u010dek B", "NameEN": "B - level" }, "EntryDate1": "2021-08-22 23:59:59", "EntryDate2": "2021-08-27 23:59:59", "EntryDate3": "", "Ranking": "1", "SIType": { "ID": "2", "Name": "SI bezkontaktn\u00ed" }, "Cancelled": "0", "GPSLat": "50.7027", "GPSLon": "13.7057", "Place": "Nov\u00e9 M\u011bsto v Kru\u0161n\u00fdch hor\u00e1ch, ly\u017ea\u0159sk\u00fd stadion", "Version": "38", "ClassesLastModifiedTimeStamp": 1631020545, "ServicesLastModifiedTimeStamp": 0, "ParentID": 0, "Status": "R", "OBPostupy": "https:\/\/obpostupy.orientacnisporty.cz\/zavod\/8362ca5d0111451b9b12f1448ad658ff" },
    "Event_5555": { "ID": "5555", "Name": "Manufaktura \u010cesk\u00fd poh\u00e1r, INOV-8 CUP - \u017eeb\u0159\u00ed\u010dek A", "Date": "2021-09-04", "Org1": { "ID": "55", "Abbr": "JPV", "Name": "Odd\u00edl OS SK Prost\u011bjov" }, "Org2": [], "Region": "\u010cR", "Regions": { "Region_\u010cR": { "ID": "\u010cR", "Name": "\u010cR" } }, "Sport": { "ID": "1", "NameCZ": "OB", "NameEN": "Foot O" }, "Discipline": { "ID": "1", "ShortName": "KL", "NameCZ": "Klasick\u00e1 tra\u0165", "NameEN": "Long distance" }, "Level": { "ID": "8", "ShortName": "\u010cP", "NameCZ": "\u010cesk\u00fd poh\u00e1r", "NameEN": "Czech cup" }, "EntryDate1": "2021-08-23 23:59:59", "EntryDate2": "2021-08-30 23:59:59", "EntryDate3": "", "Ranking": "1", "SIType": { "ID": "2", "Name": "SI bezkontaktn\u00ed" }, "Cancelled": "0", "GPSLat": "49.6572", "GPSLon": "16.8277", "Place": "Kladky", "Version": "30", "ClassesLastModifiedTimeStamp": 1631020486, "ServicesLastModifiedTimeStamp": 1628351297, "ParentID": 0, "Status": "R", "OBPostupy": "https:\/\/obpostupy.orientacnisporty.cz\/zavod\/c5196ec558ab496ea7b91fb094fc6237" }
};

const UploadResultsForm = ({ isUploaded, raceDate, raceId }) => {
    const [orisRaces, setOrisRaces] = useState(ORIS_DATA_MOCK);
    const [selectedRace, setSelectedRace] = useState('');

    const handleSelectRace = (event) => {
        setSelectedRace(event.target.value);
    };

    useEffect(() => {
        if (isUploaded) return;
        //TODO Fetch oris data for raceDate
        setOrisRaces(ORIS_DATA_MOCK);
    }, [isUploaded, raceDate]);

    if (isUploaded) {
        return (
            <>
                <p>Výsledky jsou úspěšně nahrány a uloženy. Přejete si je upravit?</p>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
                >
                    <Button variant="outlined" color="primary" sx={{ mr: 2 }}>Zobrazit výsledky</Button>
                    <Button variant="outlined" color="error">Smazat výsledky</Button>
                </Box>
            </>);
    }

    const orisRacesForm = () => {
        let races = [];
        for (let key in orisRaces) {
            races.push(<MenuItem key={key} value={key}>{`${orisRaces[key].Org1.Abbr} - ${orisRaces[key].Name}, ${orisRaces[key].Discipline.NameCZ}`}</MenuItem>);
        }
        return races.map(item => item);
    }

    return (
        <Box sx={{display:'flex', flexDirection:'column'}}>
            <InputLabel id="oris-races-form-label">Vyberte z ORISu</InputLabel>
            <Select
                labelId="oris-races-form-label"
                id="oris-races-form"
                value={selectedRace}
                onChange={handleSelectRace}
            >
                {orisRacesForm()}
            </Select>
            <Button variant="outlined" color="success" sx={{ alignSelf: 'flex-end', mt:2 }}>Nahrát z ORISu</Button>
            <Divider sx={{ my:2 }} />
            <InputLabel id="manual-races-form-label">... nebo nahrajte výsledky ve formátu IOF XML v.3</InputLabel>
            <FileDropzone formats={"XML"}/>
        </Box>
    );
}

export default UploadResultsForm;