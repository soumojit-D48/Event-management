import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ApproveRole from './pages/ApproveRole';
import ManageUsers from './pages/ManageUsers';
import CreateEventForm from './pages/CreateEvent';
import UpdateEvent from './pages/UpdateEvent';
import RegisterForEventForm from './pages/CreateApplication';
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

import ProtectedRoute from './components/layoutComponents/ProtectedRoute';
import PublicOnlyRoute from './components/layoutComponents/PublicOnlyRoute';
import RoleBasedRoute from './components/layoutComponents/RoleBasedRoute';
import { ROLES } from './constants/roles';
import BudgetOverview from './pages/BudgetOverview';
import RegistrationOverview from './pages/RegistrationOverview';
import AttendanceEvent from './pages/AttendanceEvent';
import AttendanceScanOverview from './pages/AttendanceScanOverview';
import AttendanceOverview from './pages/AttendanceOverview';
import FeedbackOverview from './pages/FeedbackOverview';

function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />

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

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/all"
          element={
            <ProtectedRoute>
              <EventDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registrations/register/:eventId"
          element={
            <ProtectedRoute>
              <RegisterForEventForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/my-registrations"
          element={
            <ProtectedRoute>
              <MyRegistrations />
            </ProtectedRoute>
          }
        />

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

        <Route
          path="/certificate/:eventId/get"
          element={
            <ProtectedRoute>
              <ParticipantCertificatePage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/approve-role"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.ADMIN]}>
              <ApproveRole />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/manage-users"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
              <ManageUsers />
            </RoleBasedRoute>
          }
        />
        
        <Route
          path="/create-event"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <CreateEventForm />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/events/update/:eventId"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <UpdateEvent />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/events/manage/my-events"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER]}>
              <ManagingMyEvent />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/events/:id/team"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <ManageTeam />
            </RoleBasedRoute>
          }
        />

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

        <Route
          path="/certificate/:eventId/gen"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FECULTY]}>
              <CertificateTemplateUpload />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/events/manage/by-team"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.FACULTY, ROLES.VOLUNTEER]}>
              <EventIManage />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/attendance/:eventId"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FACULTY, ROLES.VOLUNTEER]}>
              <AttendanceScanner />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/events/attendance"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FACULTY, ROLES.VOLUNTEER]}>
              <AttendanceScanOverview />
            </RoleBasedRoute>
          } 
        />

        <Route
          path="/attendance/:eventId/get"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FACULTY, ROLES.VOLUNTEER]}>
              <AttendanceEvent />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/attendance/view"
          element={
            <RoleBasedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.FACULTY, ROLES.VOLUNTEER]}>
              <AttendanceOverview/>
            </RoleBasedRoute>
          }
        />

        <Route path="*" element={<Dashboard />} />
      </Routes>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
