Events = new Mongo.Collection('events');

Events.initEasySearch(['name', 'tags', 'desc'], {
	'limit': 10,
	'use': 'mongo-db'
});