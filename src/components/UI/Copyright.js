import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.orientacnisporty.cz/">
         Český svaz orientačních sportů 2020-2022
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
};

export default Copyright;