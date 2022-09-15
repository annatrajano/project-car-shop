import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { carMock, carMockWithId, carMockGetAll } from '../../mocks/CarMoks';

describe('Tests for CarModel', () => {
	const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
        sinon.stub(Model, 'find').resolves(carMockGetAll);

	});

  after(() => {
		sinon.restore();
	});

	describe('Test if it is possible to add a vehicle (POST /cars)', () => {
		it('successfully', async () => {
			const result = await carModel.create(carMock);
			expect(result).to.be.deep.equal(carMockWithId);
            expect(result).to.be.an('object');
		});
	});

    describe('Tests if it is possible to list all vehicles (GET /cars)', () => {
        it('successfully', async () => {
          const result = await carModel.read();
          expect(result).to.be.deep.equal(carMockGetAll);
          expect(result).to.be.an('array');
        });
      });
});