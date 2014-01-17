/*
 * GET home page.
 */

var reports = {};

var specs = {
    spec0: 'var EventBus',
    spec1: 'Methods',
    spec2: 'Empty Listener',
    spec3: 'Empty EventName',
    spec4: 'Triggering One',
    spec5: 'Triggering Many',
    spec6: 'Triggering Context',
    spec7: 'One argument',
    spec8: 'Multiple arguments',
    spec9: 'Only function'
};

exports.index = function(req, res) {
    var results = [];
    for (var user in reports) {
        var data = reports[user];
        var passed = 0;
        var specResults = [];
        for (var spec in specs) {
            specResults.push(data[spec] || false);
            if (data[spec]) {
                passed++;
            }
        }

        results.push({
            user: user,
            passed: passed,
            data: specResults
        });
    }


    res.render('index', {
        title: 'Tests results',
        reports: results.sort(function(a, b) {
            return b.passed - a.passed;
        }),
        specs: specs
    });
};

var allowCrossSiteJson = function(req, res) {
    var host = req.headers['origin'];
    if (host === 'http://todr.me:3001' || host === 'http://localhost:9000' || host === 'http://localhost:3000') {
        res.setHeader("Access-Control-Allow-Origin", host);
    }
};

exports.report = function(req, res) {
    var name = req.body.name;
    reports[name] = reports[name] || {};

    var data = reports[name];
    for (var k in req.body.data) {
        data[k] = req.body.data[k] == 'true';
    }
    console.log(data);

    allowCrossSiteJson(req, res);
    res.send(200);
};

exports.clear = function(req, res) {
    reports = {};
    res.send(200);
};

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
var trainingsCollection = null;
var codeCollection = null;
MongoClient.connect("mongodb://localhost:27017/devmeetings", function(err, db) {
    if (err) {
        throw err;
    }
    trainingsCollection = db.collection('trainings');
    codeCollection = db.collection('code');
});

exports.trainings = function(req, res) {
    var data = req.body;
    data.date = new Date();

    trainingsCollection.insert(data, {
        w: 1
    }, function(err, data) {
        allowCrossSiteJson(req, res);
        res.send(data);
    });
};

var searchCollection = function(collection, req, res) {
    var search = {};
    if (req.query.username) {
        search.user = req.query.username;
    }
    collection.find(search).toArray(function(err, items) {
        res.send(items);
    });
};
exports.getTrainings = function(req, res) {
    searchCollection(trainingsCollection, req, res);
};
exports.code = function(req, res) {
    var data = req.body;
    data.date = new Date();

    codeCollection.insert(data, {
        w: 1
    }, function(err, data) {
        allowCrossSiteJson(req, res);
        res.send(data);
    });
};
exports.getCode = function(req, res) {
    searchCollection(codeCollection, req, res);
};