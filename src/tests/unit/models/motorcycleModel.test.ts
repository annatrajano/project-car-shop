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
        sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
        sinon.stub(Model, 'findOneAndDelete').resolves(motorcycleMockWithId);

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

    describe('Tests if it is possible to list a motorcycle (GET /motorcycle/:id)', () => {
		it('successfully found', async () => {
			const result = await motorcycleModel.readOne('4edd40c86762e0fb12000003');
			expect(result).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id not found', async () => {
			try {
				await motorcycleModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

    describe('Tests if it is possible to delete a motorcycle (DELETE /motorcycles/:id)', () => {
		it('successfully removed', async () => {
			const motorcycleRemoved = await motorcycleModel.delete(motorcycleMockWithId._id);
			expect(motorcycleRemoved).to.be.an('object');
		});

		it('_id not found to remove', async () => {
			try {
				await motorcycleModel.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});
});