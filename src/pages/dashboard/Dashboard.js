import { Grid, Paper, Typography } from "@mui/material";
import { width } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ContentBox from "../../components/UI/ContentBox";
import CloseIcon from '@mui/icons-material/Close';
import Table from "../../components/UI/Table";

const rows = [
    { id: 1, date: new Date(), name: 'MČR Klasická trať' },
    { id: 2, date: new Date(), name: 'MČR Krátká trať' },
    { id: 3, date: new Date(), name: 'MČR Klasická trať' },
    
    { id: 4, date: new Date(), name: 'MČR Klasická trať' },
    
    { id: 5, date: new Date(), name: 'MČR Klasická trať' },
    { id: 6, date: new Date(), name: 'MČR Klasická trať' },
    { id: 7, date: new Date(), name: 'MČR Klasická trať' },
    { id: 8, date: new Date(), name: 'MČR Klasická trať' },
    { id: 9, date: new Date(), name: 'MČR Klasická trať' },
    { id: 10, date: new Date(), name: 'MČR Klasická trať' },
    { id: 11, date: new Date(), name: 'MČR Klasická trať' },
];

const myRacesDef = [
    {
        Header: ' ',
        columns: [
            {
                Header: 'Datum',
                accessor: 'date',
                Cell: ({ cell: { value } }) => value.toLocaleDateString("cs-CZ"),
                sortType: "datetime",
                filter: (rows, id, filterValue) => {
                    if(filterValue.length == 0) return rows;
                    return rows.filter((row) => filterValue.includes(row.values.date.getFullYear()));
                }
            },
            {
                Header: 'Název',
                accessor: 'name',
            }
        ],
    }
];

const columns = [
    { field: 'raceDate', headerName: 'Datum závodu' },
    { field: 'name', headerName: 'Název'},
    { field: 'actions', type: 'actions', align: 'right', getActions: (params) => [
        <GridActionsCellItem icon={<CloseIcon />} label="Smazat" onClick={()=>{}} />
    ]}
];

const Dashboard = () => {
    return (
        <>
            <h1>Vítejte jméno!</h1>
            <Grid container>
                <Grid item xs={12} lg={4}>
                    <ContentBox sx={{ m: 1 }}>
                        <Typography variant="h6" align="center">
                            Profil
                        </Typography>

                    </ContentBox>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <ContentBox sx={{ m: 1 }}>
                        <Typography variant="h6" align="center">
                            Moje poslední závody
                        </Typography>
                        <Table columns={myRacesDef} data={rows} />
                    </ContentBox>
                </Grid>
                <Grid item xs={12} md={8}>
                    <ContentBox sx={{ m: 1 }}>
                        <Typography variant="h6" align="center">
                            Poslední veřejné závody
                        </Typography>
                    </ContentBox>
                </Grid>
                <Grid item xs={12} md={4}>
                    <ContentBox sx={{ m: 1 }}>
                        <Typography variant="h6" align="center">
                            Moje poslední závody
                        </Typography>
                    </ContentBox>
                </Grid>

            </Grid>
        </>
    );
};

export default Dashboard;