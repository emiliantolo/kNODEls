const methods = require('./superTestMethods');
let IDS=[];
/////////////////////////////////////////////////////////////////// test on PUT methods ////////////////////////////////////////////////////////////////
test('PUT /v1/users/:UserId should return 400 if UserId 0 is passed', async () => {
	let user = { 
		name: 'puttestname',
		surname: 'puttestsurname',
		email: 'putemail@test.it'
	}
	const createdUser = await methods.createUsers(user);	
	let idCreatedUser = createdUser.body[0];
	IDS.push(idCreatedUser);//AD id to be removed at the end
	let updateUserData = {
		name: 'UPDATE:putTestName',
		surname: 'UPDATE:putTestSurname',
		email: 'UPDATE:putemail@test.it'
	}
	const response = await methods.updateUserByUserId(0,updateUserData); 
	expect(response.status).toBe(400);
});

test('PUT /v1/users/:UserId should return 400 if no proper UserId is passed', async () => {
	let user = { 
		name: 'putTestName',
		surname: 'putTestSurname',
		email: 'putemail@test.it'
	}
	const createdUser = await methods.createUsers(user);
	let idCreatedUser = createdUser.body[0];
	IDS.push(idCreatedUser);//AD id to be removed at the end
	let updateUserData = {
		name: 'UPDATE:putTestName',
		surname: 'UPDATE:putTestSurname',
		email: 'UPDATE:putemail@test.it'
	}
	const response1 = await methods.updateUserByUserId("123456789abcdefghi123456789",updateUserData); 
	const response2 = await methods.updateUserByUserId("123456789abcdefghi1234",updateUserData); 
	expect(response1.status).toBe(400);
	expect(response2.status).toBe(400);
});

test('PUT /v1/users/:UserId should return 400 if no parameter between name,username and email is in body', async () => {
	let user = { 
		name: 'putTestName',
		surname: 'putTestSurname',
		email: 'putemail@test.it'
	}
	const createdUser = await methods.createUsers(user);
	let idCreatedUser = createdUser.body[0];
	IDS.push(idCreatedUser);//AD id to be removed at the end
	let updateUserData = {};
	const response = await methods.updateUserByUserId(idCreatedUser,updateUserData); 
	expect(response.status).toBe(400);
});

test('PUT /v1/users/:UserId should return 400 if parameters are invalid or void', async () => {
	let user = { 
		name: 'putTestName',
		surname: 'putTestSurname',
		email: 'putemail@test.it'
	}
	const createdUser = await methods.createUsers(user);
	const idCreatedUser = createdUser.body[0];
	IDS.push(idCreatedUser);//AD id to be removed at the end
	const updateUserData1 = {name:0};
	const updateUserData2 = {surname:0};
	const updateUserData3 = {email:0};
	const updateUserData4 = {name:'      '};
	const updateUserData5 = {surname:'       '};
	const updateUserData6 = {email:'       '};
	const updateUserData7 = {email:'test.AT.com'};
	const response1 = await methods.updateUserByUserId(idCreatedUser,updateUserData1); 
	const response2 = await methods.updateUserByUserId(idCreatedUser,updateUserData2); 
	const response3 = await methods.updateUserByUserId(idCreatedUser,updateUserData3); 
	const response4 = await methods.updateUserByUserId(idCreatedUser,updateUserData4); 
	const response5 = await methods.updateUserByUserId(idCreatedUser,updateUserData5); 
	const response6 = await methods.updateUserByUserId(idCreatedUser,updateUserData6); 
	const response7 = await methods.updateUserByUserId(idCreatedUser,updateUserData7); 
	expect(response1.status).toBe(400);
	expect(response2.status).toBe(400);
	expect(response3.status).toBe(400);
	expect(response4.status).toBe(400);
	expect(response5.status).toBe(400);
	expect(response6.status).toBe(400);
	expect(response7.status).toBe(400);
});

test('PUT /v1/users/:UserID should return 400 if there is nothing to update (same data)', async () =>{
	jest.setTimeout(10000);
	let user = { 
		name: 'putTestName',
		surname: 'putTestSurname',
		email: 'putemail@test.it'
	}
	const updateUser1 = { name: 'putTestName'};
	const updateUser2 = { surname: 'putTestSurname'};
	const updateUser3 = { email: 'putemail@test.it'};
	const updateUser4= { 
		name: 'putTestName',
		surname: 'putTestSurname',
		email: 'putemail@test.it'
	}
	const createdUser = await methods.createUsers(user);
	const idCreatedUser = createdUser.body[0];
	IDS.push(idCreatedUser);//AD id to be removed at the end
	const request1 = await methods.updateUserByUserId(idCreatedUser,updateUser1);
	const request2 = await methods.updateUserByUserId(idCreatedUser,updateUser2);
	const request3 = await methods.updateUserByUserId(idCreatedUser,updateUser3);
	const request4 = await methods.updateUserByUserId(idCreatedUser,updateUser4);
	expect(request1.status).toBe(400);
	expect(request2.status).toBe(400);
	expect(request3.status).toBe(400);
	expect(request4.status).toBe(400);
});

test('PUT /v1/users/:UserID should return 404 if the id passed is not found', async () => {
	const idReq = '0000000012345678abcdef12'; //this id can not exist because every id's first 4 bytes are the time enlpased from the first boot of the firts Linux OS 
	const updateUser = { name: 'testName'};
	const request = await methods.updateUserByUserId(idReq,updateUser);
	expect(request.status).toBe(404);
});

test('PUT /v1/users/:UserId should return 200 if the update is correctly done', async () => {
	let user = { 
		name: 'putTestName',
		surname: 'putTestSurname',
		email: 'putemail@test.it'
	}
	const updateUser = { 
		name: 'PUT_TEST_NAME',
		surname: 'PUT_TEST_SURNAME',
		email: 'mailput@it.test'
	}
	const putResult = await methods.createUsers(user);
	IDS.push(putResult.body[0]);//AD id to be removed at the end
	const result = await methods.updateUserByUserId(putResult.body[0],updateUser);
	const getResult = await methods.getUserByUserId(putResult.body[0]);
	expect(getResult.body.name).toBe(updateUser.name);
	expect(getResult.body.surname).toBe(updateUser.surname);
	expect(getResult.body.email).toBe(updateUser.email);
	expect(result.status).toBe(200);
});

////////////////////////////////////////////////////////////// test on POST methods /////////////////////////////////////////////////////////////////
test('POST /v1/users should retrun 201 even if extra parameters are entered ( thath will not be inserted)', async () => {
	jest.setTimeout(10000);
	let user = {
		name: 'NAME_TEST',
		surname: 'SURNAME_TEST',
		email: 'NAME.SURNAME@TEST.TEST',
		notincluded: 'not included'
	}
	const response = await methods.createUsers(user);
	IDS.push(response.body[0]);//AD id to be removed at the end
	const getResponse= await methods.getUserByUserId(response.body[0]);
	expect(response.status).toBe(201);
	expect(getResponse.body.name).toBe(user.name.trim());
	expect(getResponse.body.surname).toBe(user.surname.trim());
	expect(getResponse.body.email).toBe(user.email.trim().toLowerCase());
	expect(getResponse.body.notincluded).toBe(undefined);
});
test('POST /v1/users should retrun 400 if any of the parameters (name,surname,email) is missing', async () => {
	jest.setTimeout(10000);
	let user1 = {
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
	const response1 = await methods.createUsers(user1);
	expect(response1.status).toBe(400);
	const response2 = await methods.createUsers(user2);
	expect(response2.status).toBe(400);
	const response3 = await methods.createUsers(user3);
	expect(response3.status).toBe(400);
	IDS.push(response1.body[0]);//AD id to be removed at the end
	IDS.push(response2.body[0]);//AD id to be removed at the end
	IDS.push(response3.body[0]);//AD id to be removed at the end
});

test('POST /v1/users should retrun 400 if any of the parameters (name,surname,email) is invalid', async () => {
	//jest.setTimeout(10000);
	let user1 = {
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
	let user4 = { 
		name: '    ',
		surname: '    ',
		email: '    '
	}
	const response1 = await methods.createUsers(user1);
	const response2 = await methods.createUsers(user2);
	const response3 = await methods.createUsers(user3);
	const response4 = await methods.createUsers(user4);
	expect(response1.status).toBe(400);
	expect(response2.status).toBe(400);
	expect(response3.status).toBe(400);
	expect(response4.status).toBe(400);
	IDS.push(response1.body[0]);//AD id to be removed at the end
	IDS.push(response2.body[0]);//AD id to be removed at the end
	IDS.push(response3.body[0]);//AD id to be removed at the end
	IDS.push(response4.body[0]);//AD id to be removed at the end
});

test('POST /v1/users should return 400 id email does not contain a @ character', async() => {
	let user = {
		name: 'NAME_TEST',
		surname: 'SURNAME_TEST',
		email: 'NAME.USERNAME.MAIL.COM' 
	}
	const response = await methods.createUsers(user);
	expect(response.status).toBe(400);
	IDS.push(response.body[0]);//AD id to be removed at the end
});

test('POST /v1/users should return 400 if no data is sent', async () => {
	let user = {};
	const response = await methods.createUsers(user);
	expect(response.status).toBe(400);
	IDS.push(response.body[0]);//AD id to be removed at the end
});


///////////////////////////////////////////////// tests on GET methods ////////////////////////////////////////////////////////////////
test('GET /v1/users should return 200 if all users are found', async () =>{
	const request = await methods.getUsers();
	expect(request.status).toBe(200);
})
test('GET /v1/users/:UserId should retun 404 if user is not found',async () => {
	jest.setTimeout(10000);
	let idReq = '000000001111111111111111';
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
test('GET /users/:id should return the right user', async () => {
	let user = {
		name: 'USER_NAME',
		surname: 'USER_SURNAME',
		email: 'NAME.SURNAME@MAIL.COM'
	}
	const createdUser= await methods.createUsers(user);
	const id = createdUser.body[0];
	IDS.push(id);//AD id to be removed at the end
	const response = await methods.getUserByUserId(id);
	expect(response.body.name).toBe(user.name.trim());
	expect(response.body.surname).toBe(user.surname.trim());
	expect(response.body.email).toBe(user.email.trim().toLowerCase());
}); 

/////////////////////////////////////////////////////////////////// test on DELETE methods /////////////////////////////////////////////////////////////
test('DELETE /v1/users/:UserId should return 400 if UserId 0 is passed', async() =>{
	const request = await methods.deleteUserByUserId(0);
	expect(request.status).toBe(400);
});
test('DELETE /v1/users/:UserId should return 400 if no proper UserId is passed', async() =>{
	const request1 = await methods.deleteUserByUserId('123456789abcdefghi123456789');
	const request2 = await methods.deleteUserByUserId('123456789abcdefghi123');
	expect(request1.status).toBe(400);
	expect(request2.status).toBe(400);
});
test('DELETE /v1/users/:UserId should return 404 if no UserId is found', async() =>{
	const request = await methods.deleteUserByUserId('0000000012345678abcdef12');//this id can not exist because every id's first 4 bytes are the time enlpased from the first boot of the firts Linux OS 
	expect(request.status).toBe(404);
});
test('DELETE /v1/users/:UserId should return 200 if deletion is done', async() =>{
	for( let id of IDS){
		if(id != undefined){
			const request = await methods.deleteUserByUserId(id);
			const getRequest = await methods.getUserByUserId(id);
			expect(request.status).toBe(200);
			expect(getRequest.status).toBe(404);
		}
	}
});
