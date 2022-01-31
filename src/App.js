import './App.css';
import MainTheme from './components/UI/MainTheme';
import Router from './Router';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import cs from 'date-fns/locale/cs';

function App() {
  return (
    <MainTheme>
      <LocalizationProvider dateAdapter={DateAdapter} locale={cs}>
        <Router />
      </LocalizationProvider>
    </MainTheme>
  );
}

export default App;
