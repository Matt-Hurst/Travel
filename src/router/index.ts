import express from 'express';
import controller from '../controller';

const router = express.Router();

router.post('/', controller.validatePost, controller.postEntries)

router.delete('/', (req, res) => {
  res.send('DELETE ONLINE')
})

router.patch('/', (req, res) => {
  res.send('PATCH WORKS')
})

router.get('/', (req, res) => {
  res.send('GET WORKS')
})

export default router;