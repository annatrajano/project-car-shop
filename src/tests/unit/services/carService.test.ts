import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId, carMockGetAll} from '../../mocks/CarMoks';

describe('Tests for CarService', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);
 
	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'read').resolves(carMockGetAll);
	})
	after(() => {
		sinon.restore()
	})
	describe('Create Cars', () => {
		it('Success', async () => {
			const result = await carService.create(carMock);

			expect(result).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				// o "as any"(casting) abaixo pois o create não aceita um parâmetro inválido
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('Read All Cars', () => {
		it('Success', async () => {
			const result = await carService.read();

			expect(result).to.be.deep.equal(carMockGetAll);
		});
	});

});