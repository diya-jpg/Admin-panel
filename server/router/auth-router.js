const express=require("express");
const router=express.Router();
//const multer = require('multer');
const authcontrollers=require("../controllers/auth-controller")
const authenticate = require("../middlewares/authenticate");
const checkAdmin = require("../middlewares/checkAdmin");
const profileAuthenticate=require("../middlewares/profile_authenticate");

// router.route("/").get(home);
router.post('/login',authcontrollers.login);
//const upload = multer({ dest: 'uploads/' });
router.post('/register',authcontrollers.register);
router.use('/dashboard/devices',authcontrollers.devices);
router.get('/dashboard/users/:id',authenticate,checkAdmin,authcontrollers.getUserById);

router.use('/dashboard/users',authcontrollers.users);



//router.post('/addDevice', upload.fields([{ name: 'photo1' }, { name: 'photo2' }]), authcontrollers.addDevice);
//router.post('/addDevice', authcontrollers.addDevice);
router.post('/addDevice', authenticate, checkAdmin, authcontrollers.addDevice);
router.get('/profile',profileAuthenticate,authcontrollers. getProfile);
router.post('/dashboard/addUser',authenticate, checkAdmin, authcontrollers.addUser);
router.put('/devices/:id/assign', authenticate, checkAdmin, authcontrollers.changeUser);
router.get('/devices/:id', authenticate, checkAdmin, authcontrollers.getDeviceById);
router.put('/devices/:id',authenticate,checkAdmin,authcontrollers.updateDevice);
router.get('/devices/:id/assignment-history',authenticate,checkAdmin, authcontrollers.getDeviceAssignmentHistory);
// router.put('/dashboard/devices/:id/assign', authenticate, checkAdmin, authcontrollers.changeUser);
// router.get('/dashboard/devices/:id', authenticate, checkAdmin, authcontrollers.getDeviceById);
// router.put('/dashboard/devices/:id', authenticate, checkAdmin, authcontrollers.updateDevice);


module.exports=router;