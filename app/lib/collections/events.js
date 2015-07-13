Events = new Mongo.Collection('events');

Events.initEasySearch(['name', 'tags', 'desc'], {
	'limit': 20,
	'use': 'mongo-db'
});