import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/MotorcycleMocks';
import MotorcycleController from '../../../controllers/MotorcycleController';
import MotorcycleService from '../../../services/MotorcycleService';
import MotorcycleModel from '../../../models/MotorcycleModel';


describe('Tests for MotorcycleController', () => {
  const motorcycleModel = new MotorcycleModel()
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);
  // fazemos o cast de um objeto para um `Request` pois nosso controller só vai aceitar um objeto do tipo `Request` como primeiro parâmetro
  const req = {} as Request; 
  // o mesmo acontece com o segundo parâmetro
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Motorcycles', () => {
    it('Success', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);
      // o cast de `res.status` é feito pois `res` foi criado como do tipo `Resquest` 
      // e agora, que queremos validar com o que foi chamado, precisar ser tratado como um `sinon.SinonStub`
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

});