Events = new Mongo.Collection('events');

Events.initEasySearch(['name'], {
	'limit': 20,
	'use': 'mongo-db'
});