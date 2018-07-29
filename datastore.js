var Datastore = require('nedb')

var initializeDataStore = exports.initializeDataStore = () => {
    return new Promise((resolve, reject) => {
        var db = {};

        db.userInfo = new Datastore({ filename: `${__dirname}/datastore/local/userInfo`, autoload: true });
        db.userInfo.find({ _id: '0000000000000001' }, (err, docs) => {
            console.log(err, docs, docs.length)
            if (docs.length !== 0) {
                console.log('returniun')
                return
            }
            db.userSettings = new Datastore({ filename: `${__dirname}/datastore/local/userSettings`, autoload: true });
            db.dataCollection = new Datastore({ filename: `${__dirname}/datastore/local/dataCollection`, autoload: true });
            console.log('not returned')
            var doc = { 
                        _id: '0000000000000001'
                    };
            db.userInfo.insert(doc, function (err, newDoc) {   // Callback is optional
            });
        });
    })
}