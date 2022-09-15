import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

const carMockWithId: ICar & { _id: string } = {
	_id: '62cf1fc6498565d94eba52cd',
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

const carMockGetAll:(ICar & { _id:string })[] = [{
	_id: '62cf1fc6498565d94eba52cd',
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
}];

const carMockForChange: ICar = {
    model: "Ferrari Maranello Exclusive",
    year: 1963,
    color: "black",
    buyValue: 4000000,
    seatsQty: 2,
    doorsQty: 2
};

const carMockForChangeWithId: ICar & { _id: string } = {
	_id: '62cf1fc6498565d94eba52cd',
    model: "Ferrari Maranello Exclusive",
    year: 1963,
    color: "black",
    buyValue: 4000000,
    seatsQty: 2,
    doorsQty: 2
};


export {
	carMock,
	carMockWithId,
    carMockGetAll,
    carMockForChange,
    carMockForChangeWithId
}