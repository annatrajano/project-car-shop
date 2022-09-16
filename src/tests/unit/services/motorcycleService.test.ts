import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcyleService from '../../../services/MotorcycleService';
import { motorcycleMock, motorcycleMockWithId, motorcycleMockGetAll } from '../../mocks/MotorcycleMocks';

describe('Tests for MotorcycleService', () => {
	const motorcyleModel = new MotorcycleModel();
	const motorcyleService = new MotorcyleService(motorcyleModel);
 
	before(() => {
		sinon.stub(motorcyleModel, 'create').resolves(motorcycleMockWithId);
        sinon.stub(motorcyleModel, 'read').resolves(motorcycleMockGetAll);
	})
	after(() => {
		sinon.restore()
	})


	describe('Create Motorcycles', () => {
		it('Success', async () => {
			const result = await motorcyleService.create(motorcycleMock);

			expect(result).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			try {
				// o "as any"(casting) abaixo pois o create não aceita um parâmetro inválido
				await motorcyleService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('Read All Motorcycles', () => {
		it('Success', async () => {
			const result = await motorcyleService.read();

			expect(result).to.be.deep.equal(motorcycleMockGetAll);
		});
	});
    

});