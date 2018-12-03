let MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://knodels:knodels97@ds123224.mlab.com:23224/knodels';
const dbConnected = MongoClient.connect(url);
let dbInit = function (){
	dbConnected.then(
		client => { 	
			let db = client.db('knodels'); 
			db.listCollections().toArray().then(
				array =>{
					console.log(array);	

					for( let n of array){
						let collName = n.name;
						if(collName.indexOf('system')<0){
							db.dropCollection(collName)
								.then( ()=>{console.log('collection dropped');})
								.catch( err => { throw err; })									
						}
					}

					return db;
				}	
			)
			.catch( err => { throw err; })
			.then( // when deletion is completed do this section
				(db) =>{
					 db.collection('Users').insertMany([
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
					]);		
					console.log('insertion ended');
					connection.close();
					console.log('connection closed');
				}	
			)	
		}
	)
	.catch(err => {})
}
exports.dbInit = dbInit;
