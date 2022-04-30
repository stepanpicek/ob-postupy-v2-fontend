import { Button } from "@mui/material";
import ContentBox from "../../components/UI/ContentBox";
import CloseIcon from '@mui/icons-material/Close';
import Table from "../../components/UI/Table";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/use-auth";
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from "../../components/UI/AlertDialog";
import useAlertWrapper from "../../hooks/use-alert";

const PrivateRaces = () => {
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();
    const auth = useAuth();
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
                    Header: 'Typ',
                    accessor: 'type',
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
                    type: GetType(item.type)
                });
            }));
        }).then((status) => {
            if(status === 401){
                auth.logout();
            }
        });
    }, []);

    const GetType = (type) => {
        switch(type){
            case 'Public':
                return "Veřejné";
            case 'Private':
                return "Soukromé";
            case 'Shared':
                return "Sdílené";
            default: return "";
        }
    }

    return <>
        <h1>Moje závody</h1>
        <ContentBox sx={{ m: 1 }}>
            {userRaces == null || userRaces.length == 0 ?
                <p>Nemáte vytvořený žádný závod.</p> :
                <Table columns={myOwnRacesDef} data={userRaces} />}
        </ContentBox>
        <AlertDialog open={alertDialog} close={() => {setAlertDialog(false)}} confirm={alertDialogConfirm} content={alertDialogContent} />
    </>;
};

export default PrivateRaces;