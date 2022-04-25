import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const AlertDialog = ({content, open, confirm, close}) => {
    return (<Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirm} color="success" variant='outlined'>Ano</Button>
          <Button onClick={close} color="error" variant='outlined'>Ne</Button>
        </DialogActions>
      </Dialog>);
} 
      

export default AlertDialog;