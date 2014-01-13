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

exports.report = function(req, res) {
    var name = req.body.name;
    reports[name] = reports[name] || {};

    var data = reports[name];
    for (var k in req.body.data) {
        data[k] = req.body.data[k] == 'true';
    }
    console.log(data);

    var host = req.headers['origin'];
    if (host === 'http://todr.me:3001' || host === 'http://localhost:9000') {
        res.setHeader("Access-Control-Allow-Origin", host);
    }
    res.send(200);
};

exports.clear = function(req, res) {
    reports = {};
    res.send(200);
};