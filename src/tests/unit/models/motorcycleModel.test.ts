import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId, motorcycleMockGetAll } from '../../mocks/MotorcycleMocks';

describe('Tests for MotorcycleModel', () => {
	const motorcycleModel = new MotorcycleModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
        sinon.stub(Model, 'find').resolves(motorcycleMockGetAll);

	});

  after(() => {
		sinon.restore();
	});

	describe('Test if it is possible to add a motorcycle (POST /motorcycles)', () => {
		it('successfully', async () => {
			const result = await motorcycleModel.create(motorcycleMock);
			expect(result).to.be.deep.equal(motorcycleMockWithId);
            expect(result).to.be.an('object');
		});
	});

    describe('Tests if it is possible to list all motorcycles (GET /motorcycles)', () => {
        it('successfully', async () => {
          const result = await motorcycleModel.read();
          expect(result).to.be.deep.equal(motorcycleMockGetAll);
          expect(result).to.be.an('array');
        });
      });
});