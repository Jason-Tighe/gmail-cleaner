import { Router } from 'express'
import { getEmails } from '../controllers/gmailController.js'

const router = Router()

router.get('/gmail', getEmails)


export default router
