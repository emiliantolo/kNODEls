let MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://simone:knodels97@knodels-crpnx.mongodb.net/test?retryWrites=true/knodels';
const dbConnected = MongoClient.connect(url);
let dbInit =  function (){
	let connection = null;
	dbConnected.then(
		(client) => { 	
			connection = client; // so we can move the collection around
			const db = client.db('knodels');
			return db.dropDatabase();
		}
	)
	.then(
		() =>{
			console.log('----->database dropped');
			let db = connection.db('knodels');
			return db.collection('Users').insertMany([
				{
					Name:'Emiliano',
					Surname:'Sartori',
					Email:'emiliano.sartori@gmail.com'
				},

				{
					Name:'Renzo',
					Surname:'Piano',
					Email: 'renzopiano@gmail.com'
				},
				{
					Name:'Anna',
					Surname:'Matricardi',
					Email: 'anna.matricardi@gmail.com'
				},
				{
					Name:'Elena',
					Surname:'Sabbioni',
					Email: 'elena.sabbioni@gmail.com'
				},
				{
					Name:'Pietro',
					Surname:'Arzi',
					Email: 'pietro.arzi@gmail.com'
				}
			])			
		}
	)
	.then(	
		() =>{
			console.log('----->insertion ended');
			connection.close();
			console.log('----->connection closed');
		}
	)
	.catch((err) => {throw err;})
}
exports.dbInit = dbInit;
