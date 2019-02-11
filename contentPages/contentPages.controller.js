const express = require('express');
const router = express.Router();
const contentPageService = require('./contentPage.service');
const authorize = require('_helpers/authorize');

const getAll = (req, res, next) => {
    contentPageService.getAll(req.query['type'])
        .then(contentPages => res.json(contentPages))
        .catch(err => next(err));
};

const getById = (req, res, next) => {
    contentPageService.getById(req.params.id)
        .then(contentPage => contentPage ? res.json(contentPage) : res.sendStatus(404))
        .catch(err => next(err));
};

const create = (req, res, next) => {
    contentPageService.create(req)
        .then(contentPage => contentPage ? res.json(contentPage) : res.sendStatus(500))
        .catch(err => next(err));
};

const update = (req, res, next) => {
    contentPageService.update(req)
        .then(contentPage => contentPage ? res.json(contentPage) : res.sendStatus(500))
        .catch(err => next(err));
};

router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/', authorize(), update);
module.exports = router;