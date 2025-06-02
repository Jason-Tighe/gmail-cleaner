import { Router } from 'express'


const router = Router()


router.get('/status', (req, res, next) => {
    getCacheStatus(req, res, next);
});

router.delete('/clear/:key', (req, res, next) => {
    clearCache(req, res, next);
});


export default router
