import { Grid, Paper, Typography } from "@mui/material";
import { width } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ContentBox from "../../components/UI/ContentBox";
import CloseIcon from '@mui/icons-material/Close';

const rows = [
    { id: 1, raceDate: Date.now(), name: 'MČR Klasická trať' },
    { id: 2, raceDate: Date.now(), name: 'MČR Krátká trať' },
    { id: 3, raceDate: Date.now(), name: 'MČR Klasická trať' },
    
    { id: 4, raceDate: Date.now(), name: 'MČR Klasická trať' },
    
    { id: 5, raceDate: Date.now(), name: 'MČR Klasická trať' },
    { id: 6, raceDate: Date.now(), name: 'MČR Klasická trať' },
    { id: 7, raceDate: Date.now(), name: 'MČR Klasická trať' },
    { id: 8, raceDate: Date.now(), name: 'MČR Klasická trať' },
    { id: 9, raceDate: Date.now(), name: 'MČR Klasická trať' },
    { id: 10, raceDate: Date.now(), name: 'MČR Klasická trať' },
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
                        <div style={{ display: 'flex', height: '500px', width: '100%'}}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pagination
                                    pageSize={7}
                                    rowsPerPageOptions={[7]}
                                    initialState={{ pinnedColumns: { right: ['actions'] } }}
                                    sx={{
                                        border: 'none',
                                        width: '100%'
                                    }} />
                            </div>
                        </div>
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