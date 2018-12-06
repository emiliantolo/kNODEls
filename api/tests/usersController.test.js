const methods = require('./superTestMethods');
// test on post methods
test('POST /users should retrun 201', async () => {
	jest.setTimeout(10000);
	let user = {
		name: 'NAME_TEST',
		surname: 'SURNAME_TEST',
		email: 'NAME.SURNAME@TEST.TEST'
	}
	const response = await methods.createUser(user);
	expect(response.status).toBe(201);
});
test('POST /users should retrun 400 if any of the parameters (name,surname,email) is missing', async () => {
	jest.setTimeout(10000);
	let user = {
		surname: 'surname_test',
		email: 'name.surname@test.test'
	}
	let user2 = {
		name: 'name_test',
		email: 'NAME.SURNAME@TEST.TEST'
	}
	let user3 = {
		name: 'NAME_TEST',
		surname: 'SURNAME_TEST',
	}
	const response = await methods.createUser(user);
	expect(response.status).toBe(400);
	const response2 = await methods.createUser(user2);
	expect(response2.status).toBe(400);
	const response3 = await methods.createUser(user3);
	expect(response3.status).toBe(400);
});
test('POST /users should retrun 400 if any of the parameters (name,surname,email) is not a string', async () => {
	//jest.setTimeout(10000);
	let user = {
		name: 0,
		surname: 'SURNAME_TEST',
		email: 'NAME.SURNAME@TEST.TEST'
	}
	let user2 = {
		name: 'NAME_TEST',
		surname: 0,
		email: 'NAME.SURNAME@TEST.TEST'
	}

	let user3 = {
		name: 'NAME_TEST',
		surname: 'SURNAME_TEST',
		email: 0 
	}
	const response = await methods.createUser(user);
	expect(response.status).toBe(400);
	const response2 = await methods.createUser(user2);
	expect(response2.status).toBe(400);
	const response3 = await methods.createUser(user3);
	expect(response3.status).toBe(400);
});
test('POST /v1/users should return 400 id email does not contain a @ character', async() => {
	let user = {
		name: 'NAME_TEST',
		surname: 'SURNAME_TEST',
		email: 'NAME.USERNAME.MAIL.COM' 
	}
	const response = await methods.createUser(user);
	expect(response.status).toBe(400);
});
test('POST /v1/users should return 400 if no data is sent', async () => {
	let user = {};
	const response = await methods.createUser(user);
	expect(response.status).toBe(400);
});


// tests on GET methods
test('GET /users/:id should retun 404 if user is not fonund',async () => {
	jest.setTimeout(10000);
	let idReq = '5c07c38b1111111111111111';
	const response = await methods.getUserByUserId(idReq);
	expect(response.status).toBe(404);
});
test('GET /users/:id should return 400 if user id is 0', async () =>{
	let idReq = '0';
	const response = await methods.getUserByUserId(idReq);
	expect(response.status).toBe(400);
});
test('GET /users/:id should return 400 if user id is not exactly 24 characters long', async () =>{
	let idReq = '1111111';
	const response = await methods.getUserByUserId(idReq);
		expect(response.status).toBe(400);
});
