import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
const CATEGORIES_MOCK = ["H12", "H16", "H21L", "H21K", "H35", "H50", "H75", "D12", "D16L", "D21L", "D21K", "D35", "D50", "D75"];
const COURSES_MOCK = ["H12", "H16", "H21L", "H21K", "H35", "H50", "H75", "D12", "D16", "D21L", "D21K", "D35", "D50", "D75"];

const CoursesToCategoriesDialog = ({ onChange, open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Přiřaďte tratě ke kategoriím</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography variant='subtitle1' m={1}>Kategorie</Typography>
                        <Typography variant='subtitle1' m={1}>Trať</Typography>
                    </Box>
                    {CATEGORIES_MOCK.map((category) => {
                        return (
                            <Box key={category}>
                                <Divider />
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography variant='body1' m={1}>{category}:</Typography>
                                    <Select sx={{ minWidth: '100px' }} value={COURSES_MOCK.includes(category) ? category : ''}>
                                        {COURSES_MOCK.map((course) => <MenuItem key={course} value={course}>{course}</MenuItem>)}
                                    </Select>
                                </Box>
                            </Box>);
                    })}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Zavřít</Button>
                <Button onClick={onChange}>Uložit</Button>
            </DialogActions>
        </Dialog >
    );
}

export default CoursesToCategoriesDialog;