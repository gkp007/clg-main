import { Router } from 'express';
import Course from '../models/Course';

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

export default router;
