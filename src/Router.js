import { Provider } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import MainLayout from "./components/layout/MainLayout";
import useAuth from "./hooks/use-auth";
import AllUsers from "./pages/admin/AllUsers";
import Settings from "./pages/admin/Settings";
import PasswordReset from "./pages/auth/PasswordReset";
import PasswordResetConfirm from "./pages/auth/PasswordResetConfirm";
import PasswordResetRequest from "./pages/auth/PasswordResetRequest";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Strava from "./pages/dashboard/Strava";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AllRaces from "./pages/race/AllRaces";
import CalibrateMap from "./pages/race/CalibrateMap";
import CreateRace from "./pages/race/CreateRace";
import EditRace from "./pages/race/EditRace";
import PrivateRaces from "./pages/race/PrivateRaces";
import PublicRaces from "./pages/race/PublicRaces";
import RaceDetail from "./pages/race/RaceDetail";
import { CalibrationContextProvider } from "./store/calibration-context";
import store from './store/index';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/prihlasit" element={<SignIn />} />
                <Route path="/registrace" element={<SignUp />} />
                <Route path="/zapomenute-heslo" element={<PasswordResetRequest />} />
                <Route path="/reset-hesla" element={<PasswordReset />} />
                <Route path="/reset-hesla-potvrzeni" element={<PasswordResetConfirm />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/zavod/:raceId" element={<Provider store={store}><RaceDetail /></Provider>} />
            <Route path="/ucet" element={<PrivateRoute element={<DashboardLayout />} />}>
                <Route index element={<Dashboard />} />
                <Route path="profil" element={<Profile />} />
                <Route path="strava" element={<Strava />} />
                <Route path="vytvorit-zavod" element={<CreateRace />} />
                <Route path="editovat-zavod/:raceId" element={<EditRace />} />
                <Route path="kalibrovat-mapu/:raceId" element={<CalibrationContextProvider><CalibrateMap /></CalibrationContextProvider>} />
                <Route path="verejne-zavody" element={<PublicRaces />} />
                <Route path="moje-zavody" element={<PrivateRaces />} />
            </Route>
            <Route path="/ucet" element={<PrivateRoute  role="Admin" element={<DashboardLayout />} />}>
                <Route path="uzivatele" element={<AllUsers />} />
                <Route path="vsechny-zavody" element={<AllRaces />} />
                <Route path="nastaveni" element={<Settings />} />
            </Route>
        </Routes>
    );
};

export default Router;

const PrivateRoute = ({element, role }) => {
    let location = useLocation();
    const auth = useAuth();    

    if (!auth.isLoggedIn) {
        return <Navigate to="/prihlasit" state={{ from: location }} />;
    }
    
    if(role && (( Array.isArray(auth.roles) && !auth.roles.includes(role)) || (auth.roles != role))){
        return <Navigate to="/prihlasit" state={{ from: location }} />;
    }

    return element;
};