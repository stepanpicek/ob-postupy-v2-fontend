import L from 'leaflet';

const ControlLabelIcon = ({number}) => {
    const iconPerson = new L.DivIcon({
        html:`<p>${number}</p>`,
    });

    return(
        {iconPerson}
    );
}

export default ControlLabelIcon;