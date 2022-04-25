import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContentBox from "../../components/UI/ContentBox";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import useAuth from "../../hooks/use-auth";

const Strava = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    return (
        <>
            <Button startIcon={<ArrowLeftIcon />} onClick={() => { navigate(`/ucet/profil`) }}>
                Zpět na profil
            </Button>
            <h1>Strava</h1>
            <ContentBox>
                Aby bylo možné propojit váš účet se Stravou, je potřeba vybrat všechna oprávnění na Vaše soukromé aktivity, tzn. obě zátržítka nechat označené.
                <a href={`https://localhost:5001/strava/auth/${auth.id}`}>Propojit</a>
            </ContentBox>
        </>
    );
};

export default Strava;