import {Route, Routes} from "react-router-dom";
import {EmailPage, GuestOnly, PrivatePage, PublicPage} from "../components/Pages";
import {RestrictedRoutes} from "../App";

export const SiteRoutes = props => {
    return (
        <Routes>
            {/* Public pages */}
            <Route element={<PublicPage />} path={'/public'} />

            {/* Private pages */}
            <Route element={<RestrictedRoutes check={props.is_auth} to={'/public'} abc={123} def={456} name={'robert'} xyz={1212} />}>
                <Route element={<PrivatePage />} path={'/private'} />
                <Route element={<EmailPage />} path={'/email'} />
            </Route>

            {/* Guest only */}
            <Route element={<RestrictedRoutes check={!props.is_auth} to={'/public'} />}>
                <Route element={<GuestOnly />} path={'/guestonly'} />
            </Route>
        </Routes>
    )
}
