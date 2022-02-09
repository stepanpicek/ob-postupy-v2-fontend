import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Box, Divider } from '@mui/material';
import { useState } from 'react';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        margin: theme.spacing(2),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2)
}));

const CustomAccordion = ({ header, children }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <Box sx={{ mt: 2 }}>
            <Accordion expanded={isExpanded} onChange={() => setIsExpanded((state) => !state)} sx={{ border: '1px dashed grey' }}>
                <AccordionSummary>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'white'
                    }}>
                       {header}
                    </Box>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default CustomAccordion;