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

const AllUsers = () => {
    const [rows, setRows] = useState([]);
    const [userId, setUserId] = useState();
    const [updateDialogOpened, setUpdateDialogOpened] = useState(false);
    const { isLoading, error, sendRequest } = useHttp();
    const auth = useAuth();

    const handleUpdateUser = (id) => {
        setUserId(id);
        setUpdateDialogOpened(true);
    }

    const handleRemoveUser = (id) => {
        console.log(id);
    }

    const handleAddAdmin = (id) => {
        sendRequest({
            url: `https://localhost:5001/Role/add-admin`,
            method: 'POST',
            body: {userId: id},
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        })
        .then(() => {
            updateTable();
        });        
    }

    const handleRemoveAdmin = (id) => {
        sendRequest({
            url: `https://localhost:5001/Role/remove-admin`,
            method: 'POST',
            body: {userId: id},
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
                    Cell: ({ value }) => (<Button variant="outlined" startIcon={<EditIcon />} color="success" onClick={() => { handleUpdateUser(value) }}>Upravit</Button>)
                },
                {
                    id: 'delete',
                    accessor: 'id',
                    Cell: ({ value }) => (<Button variant="outlined" startIcon={<CloseIcon />} color="error" onClick={() => { handleRemoveUser(value) }}>Smazat</Button>)
                }
            ],
        }
    ];

    useEffect(() => {
        updateTable();
    }, []);

    const updateTable = () => {
        sendRequest({
            url: `https://localhost:5001/Profile/users`,
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
    </>;
};

export default AllUsers;