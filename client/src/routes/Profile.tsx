import { Route, Routes } from 'react-router-dom';
import ProfilePage from '~/pages/Profile/Profile';
import ProfileCompanies from '~/pages/Companies/ProfileCompanies';
import Subscriptions from '~/pages/Companies/Subscriptions';
import NotFound from '~/pages/NotFound/NotFound';

const ProfileRoutes = () => (
  <Routes>
    <Route index element={<ProfilePage />}></Route>
    <Route path="/companies" element={<ProfileCompanies />} />;
    <Route path="/subscriptions" element={<Subscriptions />} />;
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default ProfileRoutes;
