import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

const CoursesToCategoriesDialog = ({ onChange, open, onClose, data }) => {
    const [courseToCategory, setCourseToCategory] = useState(null);
    
    useEffect(() => {
        if(!data || !data.categories) return;
        setCourseToCategory(data.categories.map((category => {
            return {
                category: category.name,
                course: category.course ?? data.courses.find(c => c == category.name)
            };
        })));
    }, [data]);

    const handleSelectCourse = (category, course) => {
        if(!course) return;
        setCourseToCategory((state) => {
            let item = state.find(s => s.category == category);
            let rest = state.filter(s => s != item);
            if(item){
                item.course = course;
            }

            return [...rest, item];
        });
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Přiřaďte tratě ke kategoriím</DialogTitle>
            <DialogContent>
                {data &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography variant='subtitle1' m={1}>Kategorie</Typography>
                            <Typography variant='subtitle1' m={1}>Trať</Typography>
                        </Box>
                        {data.categories.map((category) => {
                            return (
                                <Box key={category.name}>
                                    <Divider />
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography variant='body1' m={1}>{category.name}:</Typography>
                                        <Select sx={{ minWidth: '100px' }} 
                                        value={courseToCategory?.find(c => c.category == category.name)?.course ?? ''} 
                                        onChange={(event) => {handleSelectCourse(category.name, event.target.value);}}>
                                            {data.courses.map((course) => <MenuItem key={course} value={course}>{course}</MenuItem>)}
                                        </Select>
                                    </Box>
                                </Box>);
                        })}
                    </Box>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Zavřít</Button>
                <Button onClick={() => {onChange(courseToCategory)}}>Uložit</Button>
            </DialogActions>
        </Dialog >
    );
}

export default CoursesToCategoriesDialog;