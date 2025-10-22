import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    getMyEvents,
    getEventsIManage,
    updateEvent,
    deleteEvent,
    // addOrganizers,
    removeOrganizer,
    addCoordinators,
    removeCoordinator,
    addVolunteers,
    removeVolunteer,
    manageSessions,
    getEventTeam,
    removeOrganizerByEmail,
    addOrganizerByEmail,
    removeCoordinatorById,
    removeVolunteerById,
    addCoordinatorByEmail,
    addVolunteerByEmail
} from '../controllers/eventController.js';

// Import your existing middleware
import userAuth from '../middlewares/userAuth.js'; //  protect middleware
import { authorize } from '../middlewares/authorize.js'; // role authorization

// Import event-specific middleware
import { 
    checkEventOwnership,
    checkOrganizerOrCoordinator,
    checkEventRole,
} from '../middlewares/eventMiddleware.js';
import { upload } from '../middlewares/multerMiddware.js';

const router = express.Router();

// Public routes (accessible to all authenticated users) // done full
router.get('/all', userAuth, getAllEvents);
router.get('/:eventId', userAuth, getEventById);
router.get('/:eventId/team', userAuth, getEventTeam); // pending

// Routes for authenticated users
router.get('/my/created', userAuth, authorize('organizer'), getMyEvents);
router.get('/my/managing', userAuth, getEventsIManage); // pending

// Event creation (organizer only) // done
router.post('/create', userAuth, upload.single('banner'), authorize('admin', 'organizer'), createEvent);

// Event modification (any organizer of the event) // done full
router.put('/update/:eventId', userAuth,authorize('organizer'),  checkEventOwnership, updateEvent);
router.delete('/delete/:eventId', userAuth, authorize('organizer'), checkEventOwnership, deleteEvent);


router.post(
//   "/:eventId/organizers/email",
  "/:eventId/organizers",
  userAuth,
  checkEventOwnership, // ✅ ensures user is an organizer
  addOrganizerByEmail
);

// router.delete(
//   "/:eventId/organizers/email",
//   userAuth,
//   checkEventOwnership, // ✅ ensures user is an organizer
//   removeOrganizerByEmail
// );

// Organizer management (existing organizers only)
// router.post('/:eventId/organizers', userAuth, checkEventOwnership, addOrganizers);

router.delete('/:eventId/organizers/:organizerId', userAuth, checkEventOwnership, removeOrganizer);

// Coordinator management (organizers only)
// router.post('/:eventId/coordinators', userAuth, checkEventOwnership, addCoordinators);
// router.delete('/:eventId/coordinators/:coordinatorId', userAuth, checkEventOwnership, removeCoordinator);

// // Volunteer management (organizers or coordinators)
// router.post('/:eventId/volunteers', userAuth, checkOrganizerOrCoordinator, addVolunteers);
// router.delete('/:eventId/volunteers/:volunteerId', userAuth, checkOrganizerOrCoordinator, removeVolunteer);

// Session management (organizers, coordinators, or volunteers)
router.put('/:eventId/sessions', userAuth, checkEventRole, manageSessions);



router.post(
  '/:eventId/coordinators',
  userAuth,
  checkOrganizerOrCoordinator, // ✅ Only organizers and coordinators can add coordinators
  addCoordinatorByEmail
);

router.delete(
  '/:eventId/coordinators/:coordinatorId',
  userAuth,
  checkOrganizerOrCoordinator, // ✅ Organizers and coordinators can remove coordinators
  removeCoordinatorById
);

// ============= VOLUNTEER ROUTES =============
router.post(
  '/:eventId/volunteers',
  userAuth,
  checkEventRole, // ✅ Organizers and coordinators can add volunteers
  addVolunteerByEmail
);

router.delete(
  '/:eventId/volunteers/:volunteerId',
  userAuth,
  checkEventRole, // ✅ Organizers, coordinators, and volunteers can remove volunteers
  removeVolunteerById
);

export default router;