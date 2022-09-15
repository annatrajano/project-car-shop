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
        sinon.stub(Model, 'findOne').resolves(carMockWithId);

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

      describe('Tests if it is possible to list a vehicle (GET /cars/:id)', () => {
		it('successfully found', async () => {
			const result = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(result).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});
});