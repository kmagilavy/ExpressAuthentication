const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');

const authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
};

const register = (req, res, next) => {
    userService.register(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Error registering new account' }))
        .catch(err => next(err));
};

const getAll = (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
};

const getById = (req, res, next) => {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    if (id !== currentUser.sub && currentUser.role !== Role.Admin)
        return res.status(401).json({ message: 'Unauthorized' });

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
};

router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
module.exports = router;