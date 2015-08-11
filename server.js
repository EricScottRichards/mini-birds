var express    = require('express');
var mongojs    = require('mongojs');
var bodyParser = require('body-parser');
var cors       = require('cors');

var app = express();

var nodePort = process.argv[2] || 8888;
var port     = 27017;
//          ^port from terminal



app.use(bodyParser.json());
app.use(cors());

//How to connect to database:
var db = mongojs('birds', ['sightings']);
//                ^db       ^collections

app.post('/api/sighting', function(req, res){
	db.sightings.insert(req.body, function(err, response){
		if(err)
			return res.status(500).json(err)
		else 
			return res.json(response);
	})
	console.log(response)
})

app.get('/api/sighting', function(req, res){
	console.log(req.query)
	db.sightings.find(req.query, function(err, response){
		if(err){
			res.status(500).json(err);
		} else {
			res.json(response)
		}
			console.log('get thing')
	})
})

app.delete('/api/sighting', function(req, res){
	db.sightings.remove(req.qurey, function(err, response){
		if(!err){
			res.status(418).json(response)
		} else {
			res.status(500).json(err);
		}
	})
})

app.put('/api/sighting', function(req, res){
	db.sightings.update(req.querey, req.body, function(err, response){
		if(err) res.status(500).json(err);
		else res.json(result);
	})
})

app.listen(nodePort, function(){
	console.log("listening on ", nodePort)
});