const router = require('express').Router();

const routes = ['users', 'exercises', 'workouts'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
