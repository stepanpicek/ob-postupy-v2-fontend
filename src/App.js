import './App.css';
import MainTheme from './components/UI/MainTheme';
import Router from './Router';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import cs from 'date-fns/locale/cs';
import { AuthContextProvider } from './store/auth-context';

function App() {
  return (
    <MainTheme>
      <LocalizationProvider dateAdapter={DateAdapter} locale={cs}>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </LocalizationProvider>
    </MainTheme>
  );
}

export default App;
