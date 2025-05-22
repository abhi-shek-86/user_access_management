import { Router } from 'express';
import { submitRequest, updateRequestStatus, getPendingRequests, getMyRequests, deleteRequest, getHistoryRequests, managerDeleteRequest } from '../controllers/requestController';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth';

const router = Router();
router.post('/', authenticateJWT, authorizeRoles('Employee'), submitRequest);
router.patch('/:id', authenticateJWT, authorizeRoles('Manager'), updateRequestStatus);
router.get('/pending', authenticateJWT, authorizeRoles('Manager'), getPendingRequests);
router.get('/my', authenticateJWT, authorizeRoles('Employee'), getMyRequests);
router.delete('/:id', authenticateJWT, authorizeRoles('Employee'), deleteRequest);
router.delete('/manager/:id', authenticateJWT, authorizeRoles('Manager'), managerDeleteRequest);
router.get('/history', authenticateJWT, authorizeRoles('Manager'), getHistoryRequests);

export default router;
