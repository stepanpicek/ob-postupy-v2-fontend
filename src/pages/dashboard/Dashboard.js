import { Button, Grid, Paper, Typography } from "@mui/material";
import { width } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ContentBox from "../../components/UI/ContentBox";
import CloseIcon from '@mui/icons-material/Close';
import Table from "../../components/UI/Table";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/use-auth";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { ThreeDots } from "react-loader-spinner";
import AlertDialog from "../../components/UI/AlertDialog";
import useAlertWrapper from "../../hooks/use-alert";

const myRacesDef = [
    {
        Header: ' ',
        columns: [
            {
                Header: 'Datum',
                accessor: 'date',
                Cell: ({ cell: { value } }) => new Date(value).toLocaleDateString("cs-CZ"),
                sortType: "datetime",
                filter: (rows, id, filterValue) => {
                    if (filterValue.length == 0) return rows;
                    return rows.filter((row) => filterValue.includes(row.values.date.getFullYear()));
                }
            },
            {
                Header: 'Název',
                accessor: 'name',
                Cell: (props) => {
                    return <a href={"\\zavod\\" + props.cell.row.original.ID}>{props.value}</a>
                }
            },
            {
                Header: 'Organizátor',
                accessor: 'organizer',
            }
        ],
    }
];

const Dashboard = () => {
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();
    const auth = useAuth();
    const [name, setName] = useState(null);
    const [regNumber, setRegNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [strava, setStrava] = useState(false);
    const [participationRaces, setParticipationRaces] = useState([]);
    const [userRaces, setUserRaces] = useState([]);
    const alert = useAlertWrapper();
    const [alertDialog, setAlertDialog] = useState(false);    
    const [alertDialogContent, setAlertDialogContent] = useState(null);    
    const [alertDialogConfirm, setAlertDialogConfirm] = useState(null);

    const deleteRaceHandler = (id) => {
        var confirm = () => () => {
            sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URI}/race/${id}`,
                method: 'DELETE',
                responseType: 'empty',
                headers: { 'Authorization': `Bearer ${auth.token}` }
            }).then((status) => {
                if(!status){
                    setUserRaces((state) => state.filter(race => race.ID != id));
                    alert.success("Závod byl smazán.")
                }                
            });
            setAlertDialog(false);
        }
        let race = userRaces.find(r => r.ID === id);
        setAlertDialogConfirm(confirm);
        setAlertDialogContent(<>Opravdu chcete smazat závod <strong>{race.name ?? ''}</strong>? </>);
        setAlertDialog(true);
    }

    const myOwnRacesDef = [
        {
            Header: ' ',
            columns: [
                {
                    Header: 'Datum',
                    accessor: 'date',
                    Cell: ({ cell: { value } }) => new Date(value).toLocaleDateString("cs-CZ"),
                    sortType: "datetime",
                    filter: (rows, id, filterValue) => {
                        if (filterValue.length == 0) return rows;
                        return rows.filter((row) => filterValue.includes(row.values.date.getFullYear()));
                    }
                },
                {
                    Header: 'Název',
                    accessor: 'name',
                    Cell: (props) => {
                        return <a href={"\\zavod\\" + props.cell.row.original.ID}>{props.value}</a>
                    }
                },
                {
                    Header: 'Organizátor',
                    accessor: 'organizer',
                },
                {
                    id: 'edit',
                    accessor: 'ID',
                    Cell: ({ value }) => (<Button variant="outlined" startIcon={<EditIcon />} color="success" onClick={() => { navigate(`/ucet/editovat-zavod/${value}`) }}>Upravit</Button>)
                },
                {
                    id: 'delete',
                    accessor: 'ID',
                    Cell: ({ value }) => (<Button variant="outlined" startIcon={<CloseIcon />} color="error" onClick={() => { deleteRaceHandler(value); }}>Smazat</Button>)
                }
            ],
        }
    ];

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/profile/`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            if (data.firstName || data.lastName) setName(`${data.firstName} ${data.lastName}`);
            if (data.regNumber) setRegNumber(data.regNumber);
            if (data.email) setEmail(data.email);
            setStrava(data.isStravaConnected);
        }).then((status) => {
            if(status === 401){
                auth.logout();
            }
        });
    }, []);

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/race/by-user`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {

            setUserRaces(data.races.map((item) => {
                return ({
                    ID: item.key,
                    date: new Date(item.date),
                    name: item.name,
                    organizer: item.organizer,
                    oris: item.orisId,
                    type: item.type
                });
            }));
        }).then((status) => {
            if(status === 401){
                auth.logout();
            }
        });
    }, []);

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/race/participating`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setParticipationRaces(data.races.map((item) => {
                return ({
                    ID: item.key,
                    date: new Date(item.date),
                    name: item.name,
                    organizer: item.organizer,
                    oris: item.orisId
                });
            }));
        });
    }, []);

    return (
        <>  {isLoading ? <ThreeDots color="#2e7d32" height={80} width={80} /> :
            <Grid container>
                <Grid item xs={12} lg={4}>
                    <ContentBox sx={{ m: 1 }}>
                        <Typography variant="h6" align="center">
                            Profil
                        </Typography>
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row align-items-start my-2">
                                Jméno: <div className="fw-bold ms-2">{name}</div>
                            </div>
                            <div className="d-flex flex-row align-items-start my-2">
                                Email: <div className="fw-bold ms-2">{email}</div>
                            </div>
                            <div className="d-flex flex-row align-items-start my-2">
                                Registrace: <div className="fw-bold ms-2">{regNumber}</div>
                            </div>
                            <div className="d-flex flex-row align-items-start my-2">
                                Propojení se Stravou: <div className="fw-bold ms-2">{strava ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />}</div>
                            </div>
                            <Button
                                type="submit"
                                sx={{ mt: 3, mb: 2, alignSelf: 'flex-end' }}
                                onClick={() => { navigate("profil") }}
                                endIcon={<ArrowRightIcon />}
                            >
                                Upravit profil
                            </Button>
                        </div>
                    </ContentBox>
                    <ContentBox sx={{ m: 1 }}>
                        <Typography variant="h6" align="center">
                            Závody, které jsem běžel
                        </Typography>
                        {regNumber == null ?
                            <p>Pro zobrazení odběhnutých závodů vyplňte své registrační číslo v profilu.</p> :
                            participationRaces && participationRaces.length > 0 ?
                                <Table columns={myRacesDef} data={participationRaces} /> :
                                <p>Žádné závody k zobrazení.</p>}
                    </ContentBox>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <ContentBox sx={{ m: 1 }}>
                        <Typography variant="h6" align="center">
                            Vytvořené závody
                        </Typography>
                        {userRaces == null || userRaces.length == 0 ?
                            <p>Nemáte vytvořený žádný závod.</p> :
                            <Table columns={myOwnRacesDef} data={userRaces} />}
                    </ContentBox>
                </Grid>
                <AlertDialog open={alertDialog} close={() => {setAlertDialog(false)}} confirm={alertDialogConfirm} content={alertDialogContent} />
            </Grid>
        }
        </>
    );
};

export default Dashboard;