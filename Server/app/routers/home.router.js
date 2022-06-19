module.exports = function (router) {
    var homeController = require('../controllers/home.controller');
    router.get('/', homeController.home);
    router.get('/about', homeController.about);
};