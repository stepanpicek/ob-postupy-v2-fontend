import { useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import SearchIcon from '@mui/icons-material/Search';
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import useAlertWrapper from "../../../hooks/use-alert";
import classes from './SearchControl.module.css';

const SearchControl = ({onSearchCategory}) => {
    const raceId = useSelector((state) => state.race.raceId);
    const { isLoading, sendRequest } = useHttp();
    const [searchData, setSearchData] = useState([]);
    const [term, setTerm] = useState("");
    const [isValid, setIsValid] = useState(true);
    const alert = useAlertWrapper();

    const handleSearchCategory = () => {
        if (term.length < 3) {
            return;
        }
        sendRequest({ url: `${process.env.REACT_APP_BACKEND_URI}/result/${raceId}/search/${term}` }, (data) => {
            console.log(data.categories);
            setSearchData(data.categories);
            if (data.categories.length === 0) {
                alert.warning("Nic nenalezeno.")
            }
        });
    }
    return (<>
        <InputGroup className="my-2" size="sm">
            <FormControl
                placeholder="Vyhledat jméno nebo reg. číslo"
                aria-label="Vyhledat jméno nebo reg. číslo"
                size="sm"
                minLength={3}
                isInvalid={!isValid}
                value={term}
                onChange={(value) => { setTerm(value.target.value); setIsValid(value.target.value.length >= 3 || value.target.value.length === 0) }}
            />
            <Button variant="success" onClick={handleSearchCategory}>
                <SearchIcon /> Hledat
            </Button>
            {!isValid &&
                <Form.Control.Feedback type="invalid">
                    Zadejte alespoň 3 znaky.
                </Form.Control.Feedback>
            }
        </InputGroup>
        {isLoading && <ThreeDots color="#2e7d32" height={80} width={80} />}
        {!isLoading && searchData && searchData.length > 0 &&
            <fieldset className="race">
                <legend>Výsledky hledání:</legend>
                {searchData.map((data) => {
                    return (
                        <div key={data.id}>
                            <div className={classes.category} onClick={() => {onSearchCategory(data.id)}}>{data.category}</div>
                            <div className="ms-3 d-flex flex-column">
                                {data.people.map((person) => {
                                    return (
                                        <div key={person.id} className={classes.person} onClick={() => {onSearchCategory(data.id)}}>                                            
                                            {person.status == "OK" ? `${person.position}.` : 'DISK'} {person.firstName} {person.lastName} ({person.regNumber})
                                        </div>);
                                })}
                            </div>
                        </div>
                    );
                })}
            </fieldset>
        }
    </>);
}

export default SearchControl;