/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cakes              ->  index
 * POST    /api/cakes              ->  create
 * GET     /api/cakes/:id          ->  show
 * PUT     /api/cakes/:id          ->  update
 * DELETE  /api/cakes/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Cake from './cake.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Cakes
export function index(req, res) {
  Cake.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Cake from the DB
export function show(req, res) {
  Cake.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Cake in the DB
export function create(req, res) {
  Cake.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Cake in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Cake.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Cake from the DB
export function destroy(req, res) {
  Cake.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
