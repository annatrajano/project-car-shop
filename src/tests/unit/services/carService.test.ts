import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../erros/catalog';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId, carMockGetAll} from '../../mocks/CarMoks';

describe('Tests for CarService', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);
 
	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'read').resolves(carMockGetAll);
        sinon.stub(carModel, 'readOne').resolves(carMockWithId);
        sinon.stub(carModel, 'delete').resolves(carMockWithId);
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

    describe('ReadOne Car', () => {

		it('Success', async () => {
			const result = await carService.readOne(carMockWithId._id);

			expect(result).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

    describe('Delete Car', () => {
		it('Success', async () => {
		  const carDeleted = await carService.delete('62cf1fc6498565d94eba52cd');
		  expect(carDeleted).to.be.an('object');
		});
	});

});