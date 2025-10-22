
// // import './App.css'

// function App() {

//   return (
//     <div className="bg-amber-600">Welcome page</div>
//   )
// }

// export default App





// // import './App.css'
 




import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner'; // Import Toaster for notifications
// import Home from './pages/Home';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import NotFound from './pages/NotFound';
// import Destination from './pages/Destination';
// import AskMe from './pages/AskMe';
// import Player from './pages/Player';
// import WeatherPage from './pages/WeatherPage';
// import MapPage from './pages/Map'
// import CulturalSites from './pages/CulturalSites';
// import ForgotPassword from './pages/ForgotPassword';
// import WeatherForcast from './pages/WeatherForcast';

// import Layout from './components/layout/LayoutComp';
// import ProtectedRoute from './components/layout/ProtectRoute';
// import PublicRoute from './components/layout/PublicRoute';


import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ApproveRole from './pages/ApproveRole';
import ManageUsers from './pages/manageUsers';
import CreateEventForm from './pages/CreateEvent';
import UpdateEvent from './pages/UpdateEvent';
import RegisterForEventForm from './pages/createApplication';
import EventRegistrations from './pages/GetEventRegistrations';
import MyRegistrations from './pages/MyRegistrations';
import BudgetDashboard from './pages/BudgetDashboard';
import EventDashboard from './pages/EventDashboard';
import EventDetails from './pages/EventDetails';
import ManagingMyEvent from './pages/ManagingMyEvent';
import ManageTeam from './pages/ManageTeam';
import AttendanceScanner from './pages/AttendanceMark';
import FeedbackPage from './pages/Feedback';
import EventIManage from './pages/EventIManage';
import CertificateTemplateUpload from './pages/CertificationTemplateUpload';
import ParticipantCertificatePage from './pages/ParticipentCeritificatePage';

function App() {
  return (
    <div className="relative">
      <Routes>
        {/* Public Routes - Available to non-authenticated users only */}
        
        <Route
          path="/"
          element={
            // <Layout>
              <LandingPage/>
            // </Layout>
          }
        />

        <Route
          path="/dashboard"
          element={
            // <Layout>
              <Dashboard/>
            // </Layout>
          }
        />

        <Route
          path="/signup"
          element={
            // <Layout>
              <SignUp/>
            // </Layout>
          }
        />

        <Route
          path="/signin"
          element={
            // <Layout>
              <SignIn/>
            // </Layout>
          }
        />


        <Route
          path="/approve-role"
          element={
            // <Layout>
              <ApproveRole/>
            // </Layout>
          }
        />

        <Route
          path="/manage-users"
          element={
            // <Layout>
              <ManageUsers/>
            // </Layout>
          }
        />

        <Route
          path="/create-event"
          element={
            // <Layout>
              <CreateEventForm/>
            // </Layout>
          }
        />


        <Route path="/events/update/:eventId" element={<UpdateEvent />} />
        <Route path="/registrations/register/:eventId" element={<RegisterForEventForm />} />
        <Route path="/event/:eventId/registrations" element={< EventRegistrations />} />

        <Route path="/registrations/my-registrations" element={< MyRegistrations />} />

        <Route path="/events/:eventId/budget" element={<BudgetDashboard />} />

        <Route path="/events/all" element={<EventDashboard/>} />
        <Route path="/events/:id" element={<EventDetails/>} />

        <Route path="/events/manage/my-events" element={<ManagingMyEvent/>} />
        <Route path="/events/manage/by-team" element={<EventIManage/>}/>

        <Route path="/events/:id/team" element={<ManageTeam/>}/>

        <Route
          path="/attendance/:eventId"
          element={<AttendanceScanner />}
        />

        <Route
          path="/feedback/:eventId"
          element={<FeedbackPage />}
          />

          <Route path='/certificate/:eventId/gen' element={<CertificateTemplateUpload/>}/>
          <Route path='/certificate/:eventId/get' element={<ParticipantCertificatePage/>}/>
        

        {/* 404 Route */}
        {/* <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        /> */}
      </Routes>
      
      {/* Toast notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;











