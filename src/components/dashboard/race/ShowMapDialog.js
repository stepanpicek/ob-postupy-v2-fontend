import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { MapContainer } from 'react-leaflet';
import ShowMap from './ShowMap';

const ShowMapDialog = ({ open, onClose, data }) => {
    const [transparency, setTransparency] = useState(100);
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogContent>
                {data &&
                    <MapContainer className='calibration-map'>
                        <ShowMap data={data} transparency={transparency} />
                    </MapContainer>
                }
                <div className='d-flex flex-column'>
                    <div style={{ display: 'flex' }}>Neprůhlednost mapy: <b className="mx-2">{transparency}%</b></div>
                    <Form.Select value={transparency} onChange={(event) => { setTransparency(event.target.value) }}>
                        <option value="0">0%</option>
                        <option value="20">20%</option>
                        <option value="40">40%</option>
                        <option value="60">60%</option>
                        <option value="80">80%</option>
                        <option value="100">100%</option>
                    </Form.Select>
                </div>
            </DialogContent>
            <DialogActions>
                
                <Button onClick={onClose}>Zavřít</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShowMapDialog;