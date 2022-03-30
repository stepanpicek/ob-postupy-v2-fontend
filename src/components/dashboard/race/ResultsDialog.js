import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { Table } from 'react-bootstrap';

const ResultsDialog = ({ open, onClose, data }) => {
    return (
        <Dialog open={open}  onClose={onClose}>
            <DialogTitle>Výsledky</DialogTitle>
            <DialogContent>
                {data &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {data.categories.map((category) => {
                            return (
                                <Table borderless key={category.id}>
                                    <thead>
                                        <tr>
                                            <th scope="col" colSpan="5">{category.category}</th>
                                        </tr>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Jméno</th>
                                            <th scope="col">Reg. číslo</th>
                                            <th scope="col">Čas</th>                                            
                                            <th scope="col">Ztráta</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category.people.map((person) => {
                                            return (
                                                <tr key={person.id}>
                                                    <th scope="row">{person.status == "ok" ? `${person.position}.` : ''}</th>
                                                    <td>{`${person.lastName} ${person.firstName}`}</td>
                                                    <td>{person.regNumber}</td>
                                                    <td>{person.status == "ok" ? person.time : 'DISK'}</td>
                                                    <td>{person.status == "ok" ? person.timeLoss : ''}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            );
                        })}
                    </Box>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Zavřít</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ResultsDialog;