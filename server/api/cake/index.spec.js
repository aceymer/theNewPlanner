'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cakeCtrlStub = {
  index: 'cakeCtrl.index',
  show: 'cakeCtrl.show',
  create: 'cakeCtrl.create',
  update: 'cakeCtrl.update',
  destroy: 'cakeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cakeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cake.controller': cakeCtrlStub
});

describe('Cake API Router:', function() {

  it('should return an express router instance', function() {
    cakeIndex.should.equal(routerStub);
  });

  describe('GET /api/cakes', function() {

    it('should route to cake.controller.index', function() {
      routerStub.get
        .withArgs('/', 'cakeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/cakes/:id', function() {

    it('should route to cake.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'cakeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/cakes', function() {

    it('should route to cake.controller.create', function() {
      routerStub.post
        .withArgs('/', 'cakeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/cakes/:id', function() {

    it('should route to cake.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'cakeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cakes/:id', function() {

    it('should route to cake.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'cakeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cakes/:id', function() {

    it('should route to cake.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'cakeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
