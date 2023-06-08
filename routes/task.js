import express from 'express'
import { deleteTask, myTask, newTask, updateTask } from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();


router.post('/new',isAuthenticated,newTask)
router.get('/me',isAuthenticated,myTask)

router.put('/:id',isAuthenticated,updateTask)
router.delete('/:id',isAuthenticated,deleteTask)
export default router;