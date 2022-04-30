import { Button, Dialog, DialogContent, IconButton, Toolbar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import ContentBox from "../../components/UI/ContentBox";
import Table from "../../components/UI/Table";
import useAuth from "../../hooks/use-auth";
import useHttp from "../../hooks/use-http";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import UpdateProfileForm from "../../components/dashboard/profile/UpdateProfileForm";
import useAlertWrapper from "../../hooks/use-alert";
import AlertDialog from "../../components/UI/AlertDialog";

const AllUsers = () => {
    const [rows, setRows] = useState([]);
    const [userId, setUserId] = useState();
    const [updateDialogOpened, setUpdateDialogOpened] = useState(false);
    const { isLoading, sendRequest } = useHttp();
    const auth = useAuth();
    const alert = useAlertWrapper();
    const [alertDialog, setAlertDialog] = useState(false);    
    const [alertDialogContent, setAlertDialogContent] = useState(null);    
    const [alertDialogConfirm, setAlertDialogConfirm] = useState(null);

    const handleUpdateUser = (id) => {
        setUserId(id);
        setUpdateDialogOpened(true);
    }

    const handleRemoveUser = (id) => {
        var confirm = () => () => {
            setAlertDialog(false);
        }
        
        let user = rows.find(r => r.id === id);
        setAlertDialogConfirm(confirm);
        setAlertDialogContent(<>Opravdu chcete smazat uživatele <strong>{user.firstName} {user.lastName} ({user.email})</strong>? </>);
        setAlertDialog(true);
    }

    const handleAddAdmin = (id) => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/Role/add-admin`,
            method: 'POST',
            body: {userId: id},
            responseType: 'empty',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        })
        .then(() => {
            updateTable();
        });        
    }

    const handleRemoveAdmin = (id) => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/Role/remove-admin`,
            method: 'POST',
            body: {userId: id},            
            responseType: 'empty',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }) 
        .then(() => {
            updateTable();
        });
    }

    const usersDef = [
        {
            Header: ' ',
            columns: [
                {
                    Header: 'Jméno',
                    accessor: 'firstName'
                },
                {
                    Header: 'Příjmení',
                    accessor: 'lastName'
                },
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Role',
                    id: 'admin',
                    accessor: 'isAdmin',
                    Cell: (props) => {
                        if(props.row.original.email == 'mail@stepanpicek.cz'){
                            return <>Super Administrátor</>
                        }
                        if (props.value) {                            
                            return <> Administrátor
                                <Tooltip title="Odebrat admin práva">
                                    <IconButton color="error" onClick={() => { handleRemoveAdmin(props.row.original.id) }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </>;

                        }
                        else {
                            return <> Uživatel
                                <Tooltip title="Přidat admin práva">
                                    <IconButton color="success" onClick={() => { handleAddAdmin(props.row.original.id) }}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </>;
                        }
                    }
                },
                {
                    id: 'edit',
                    accessor: 'id',
                    Cell: (props) => {
                        if(props.row.original.email == 'mail@stepanpicek.cz'){
                            return null;
                        }
                        return <Button variant="outlined" startIcon={<EditIcon />} color="success" onClick={() => { handleUpdateUser(props.value) }}>Upravit</Button>;
                    }
                },
                {
                    id: 'delete',
                    accessor: 'id',
                    Cell: (props) => {
                        if(props.row.original.email == 'mail@stepanpicek.cz'){
                            return null;
                        }
                        return <Button variant="outlined" startIcon={<CloseIcon />} color="error" onClick={() => { handleRemoveUser(props.value) }}>Smazat</Button>;
                    }
                }
            ],
        }
    ];

    useEffect(() => {
        updateTable();
    }, []);

    const updateTable = () => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/Profile/users`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setRows(data.users);
        });
    }
    return <>
        <h1>Uživatelé</h1>
        <ContentBox sx={{ m: 1 }}>
            <Table columns={usersDef} data={rows} />
        </ContentBox>
        <Dialog open={updateDialogOpened} onClose={() => { setUpdateDialogOpened(false) }}>
            <DialogContent>
                <UpdateProfileForm userId={userId} />
            </DialogContent>
        </Dialog>
        <AlertDialog open={alertDialog} close={() => {setAlertDialog(false)}} confirm={alertDialogConfirm} content={alertDialogContent} />
    </>;
};

export default AllUsers;