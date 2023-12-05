const {Router} = require('express');
const {DeviceController} = require('../controllers/index');
const router = Router();

//[GET] Get all posts
router.get('/',DeviceController.getAllDevices);

//[GET] get post detail
router.get('/:id', DeviceController.getDeviceDetail);

//[POST] post create a new post
router.post('/create',DeviceController.postCreateDevice);
//[PUT] post update a post
router.put('/update/:id',DeviceController.putUpdateDevice);

//[DELETE] delete a post
router.delete('/delete/:id',DeviceController.deleteDevice);

//[DELETE] delete all posts
router.delete('/delete',DeviceController.deleteAllDevices);

module.exports = router;