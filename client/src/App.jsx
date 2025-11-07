
// // import './App.css'

// function App() {

//   return (
//     <div className="bg-amber-600">Welcome page</div>
//   )
// }

// export default App





// // import './App.css'
 




// import { Route, Routes } from 'react-router-dom';
// import { Toaster } from 'sonner'; // Import Toaster for notifications



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


// import LandingPage from './pages/Landing';
// import Dashboard from './pages/Dashboard';
// import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
// import ApproveRole from './pages/ApproveRole';
// import ManageUsers from './pages/manageUsers';
// import CreateEventForm from './pages/CreateEvent';
// import UpdateEvent from './pages/UpdateEvent';
// import RegisterForEventForm from './pages/createApplication';
// import EventRegistrations from './pages/GetEventRegistrations';
// import MyRegistrations from './pages/MyRegistrations';
// import BudgetDashboard from './pages/BudgetDashboard';
// import EventDashboard from './pages/EventDashboard';
// import EventDetails from './pages/EventDetails';
// import ManagingMyEvent from './pages/ManagingMyEvent';
// import ManageTeam from './pages/ManageTeam';
// import AttendanceScanner from './pages/AttendanceMark';
// import FeedbackPage from './pages/Feedback';
// import EventIManage from './pages/EventIManage';
// import CertificateTemplateUpload from './pages/CertificationTemplateUpload';
// import ParticipantCertificatePage from './pages/ParticipentCeritificatePage';
// import ProtectedRoute from './components/layoutComponents/ProtectedRoute';
// import PublicOnlyRoute from './components/layoutComponents/PublicOnlyRoute';
// import RoleBasedRoute from './components/layoutComponents/RoleBasedRoute';

// import { ROLES } from './constants/roles';

// function App() {
//   return (
//     <div className="relative">
//       <Routes>
//         {/* Public Routes - Available to non-authenticated users only */}
        
//         <Route
//           path="/"
//           element={
//             // <Layout>
//               <LandingPage/>
//             // </Layout>
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             // <Layout>
//             <ProtectedRoute>
//               <Dashboard/>
//               </ProtectedRoute>
//             //  </Layout>
//           }
//         />

//         <Route
//           path="/signup"
//           element={
//             // <Layout>
//             <PublicOnlyRoute>
//               <SignUp/>
//               </PublicOnlyRoute>
//             // </Layout>
//           }
//         />

//         <Route
//           path="/signin"
//           element={
//             // <Layout>
            
//               <PublicOnlyRoute>
//               <SignIn/>
//               </PublicOnlyRoute>
//             // </Layout>
//           }
//         />


//         <Route
//           path="/approve-role"
//           element={
//             // <Layout>
//             <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER]}>
//               <ApproveRole/>
//               </RoleBasedRoute>
//             // </Layout>
//           }
//         />

//         <Route
//           path="/manage-users"
//           element={
//             // <Layout>
//               <ManageUsers/>
//             // </Layout>
//           }
//         />

//         <Route
//           path="/create-event"
//           element={
//             // <Layout>
//               <CreateEventForm/>
//             // </Layout>
//           }
//         />


//         <Route path="/events/update/:eventId" element={<UpdateEvent />} />
//         <Route path="/registrations/register/:eventId" element={<RegisterForEventForm />} />
//         <Route path="/event/:eventId/registrations" element={< EventRegistrations />} />

//         <Route path="/registrations/my-registrations" element={< MyRegistrations />} />

//         <Route path="/events/:eventId/budget" element={<BudgetDashboard />} />

//         <Route path="/events/all" element={<EventDashboard/>} />
//         <Route path="/events/:id" element={<EventDetails/>} />

//         <Route path="/events/manage/my-events" element={<ManagingMyEvent/>} />
//         <Route path="/events/manage/by-team" element={<EventIManage/>}/>

//         <Route path="/events/:id/team" element={<ManageTeam/>}/>

//         <Route
//           path="/attendance/:eventId"
//           element={<AttendanceScanner />}
//         />

//         <Route
//           path="/feedback/:eventId"
//           element={<FeedbackPage />}
//           />

//           <Route path='/certificate/:eventId/gen' element={<CertificateTemplateUpload/>}/>
//           <Route path='/certificate/:eventId/get' element={<ParticipantCertificatePage/>}/>
        

//         {/* 404 Route */}
//         {/* <Route
//           path="*"
//           element={
//             <Layout>
//               <NotFound />
//             </Layout>
//           }
//         /> */}
//       </Routes>
      
//       {/* Toast notifications */}
//       <Toaster position="top-right" richColors />
//     </div>
//   );
// }

// export default App;





















import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

// Pages
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

// Route Protection
import ProtectedRoute from './components/layoutComponents/ProtectedRoute';
import PublicOnlyRoute from './components/layoutComponents/PublicOnlyRoute';
import RoleBasedRoute from './components/layoutComponents/RoleBasedRoute';
import { ROLES } from './constants/roles';
import BudgetOverview from './pages/BudgetOverview';
import RegistrationOverview from './pages/RegistrationOverview';
// import AttendanceOverview from './pages/AttendanceOverview';
import AttendanceEvent from './pages/AttendanceEvent';
// import AttendanceOverview1 from './pages/Attendance';
import AttendanceScanOverview from './pages/AttendanceScanOverview';
import AttendanceOverview from './pages/AttendanceOverview';
import FeedbackOverview from './pages/FeedbackOverview';

function App() {
  return (
    <div className="relative">
      <Routes>
        {/* ========================================
            PUBLIC ROUTES (No authentication needed)
        ======================================== */}
        <Route path="/" element={<LandingPage />} />

        {/* ========================================
            PUBLIC ONLY ROUTES (Redirect if logged in)
        ======================================== */}
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignUp />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <PublicOnlyRoute>
              <SignIn />
            </PublicOnlyRoute>
          }
        />

        {/* ========================================
            PROTECTED ROUTES (Any authenticated user)
        ======================================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* All Events - Any authenticated user can view */}
        <Route
          path="/events/all"
          element={
            <ProtectedRoute>
              <EventDashboard />
            </ProtectedRoute>
          }
        />

        {/* Event Details - Any authenticated user can view */}
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />

        {/* Register for Event - Any authenticated user */}
        <Route
          path="/registrations/register/:eventId"
          element={
            <ProtectedRoute>
              <RegisterForEventForm />
            </ProtectedRoute>
          }
        />

        {/* My Registrations - Any authenticated user */}
        <Route
          path="/events/my-registrations"
          element={
            <ProtectedRoute>
              <MyRegistrations />
            </ProtectedRoute>
          }
        />

        {/* Feedback - Any authenticated user */}
        <Route
          path="/feedback/:eventId"
          element={
            <ProtectedRoute>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/feedback"
          element={
            <ProtectedRoute>
              <FeedbackOverview />
            </ProtectedRoute>
          }
        />

        {/* Get Certificate - Any authenticated user */}
        <Route
          path="/certificate/:eventId/get"
          element={
            <ProtectedRoute>
              <ParticipantCertificatePage />
            </ProtectedRoute>
          }
        />

        {/* ========================================
            ORGANIZER ONLY ROUTES (Admin functions)
        ======================================== */}
        
        {/* Approve Role Requests - Organizer/Admin only */}
        <Route
          path="/approve-role"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.ADMIN]}>
              <ApproveRole />
            </RoleBasedRoute>
          }
        />

        {/* Manage Users - Organizer/Admin only */}
        <Route
          path="/manage-users"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.ADMIN]}>
              <ManageUsers />
            </RoleBasedRoute>
          }
        />

        {/* ========================================
            ORGANIZER + FECULTY ROUTES (Event Management)
        ======================================== */}
        
        {/* Create Event */}
        <Route
          path="/create-event"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <CreateEventForm />
            </RoleBasedRoute>
          }
        />

        {/* Update Event */}
        <Route
          path="/events/update/:eventId"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <UpdateEvent />
            </RoleBasedRoute>
          }
        />

        {/* Manage My Events (Created by user) */}
        <Route
          path="/events/manage/my-events"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER]}>
              <ManagingMyEvent />
            </RoleBasedRoute>
          }
        />

        {/* Manage Team Members */}
        <Route
          path="/events/:id/team"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <ManageTeam />
            </RoleBasedRoute>
          }
        />

        {/* Budget Management */}

        <Route
          path="/events/:eventId/budget"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <BudgetDashboard />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/events/budget"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY, ROLES.VOLUNTEER]}>
              <BudgetOverview />
            </RoleBasedRoute>
          }
        />



        {/* View Event Registrations */}
        <Route
          path="/events/:eventId/registrations"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <EventRegistrations />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/events/registrations"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY, ROLES.VOLUNTEER]}>
              <RegistrationOverview />
            </RoleBasedRoute>
          }
        />

        {/* Upload Certificate Template */}
        <Route
          path="/certificate/:eventId/gen"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <CertificateTemplateUpload />
            </RoleBasedRoute>
          }
        />

        {/* ========================================
              FECULTY + VOLUNTEER ROUTES
        ======================================== */}
        
        {/* Events I Manage (Assigned as team member) */}
        <Route
          path="/events/manage/by-team"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.FECULTY, ROLES.VOLUNTEER]}>
              <EventIManage />
            </RoleBasedRoute>
          }
        />

        {/* Attendance Scanner */}
        <Route
          path="/attendance/:eventId"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY, ROLES.VOLUNTEER]}>
              <AttendanceScanner />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/events/attendance"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY, ROLES.VOLUNTEER]}>
              <AttendanceScanOverview />
            </RoleBasedRoute>
          } 
        />

        <Route
          path="/attendance/:eventId/get"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY, ROLES.VOLUNTEER]}>
              <AttendanceEvent />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/attendance/view"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY, ROLES.VOLUNTEER]}>
              <AttendanceOverview/>
            </RoleBasedRoute>
          }
        />

        {/* ========================================
            404 / FALLBACK ROUTE
        ======================================== */}
        <Route path="*" element={<Dashboard />} />
      </Routes>

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;





