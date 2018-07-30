var Datastore = require('nedb')

var initializeDataStore = exports.initializeDataStore = () => {
    return new Promise((resolve, reject) => {
        var db = {};

        db.userInfo = new Datastore({ filename: `${__dirname}/datastore/local/userInfo`, autoload: true });
        db.userInfo.find({ _id: '0000000000000001' }, (error, docs) => {
            if (error) {
                return reject(error)
            }
            if (docs.length !== 0) {
                return resolve();
            }
            db.userSettings = new Datastore({ filename: `${__dirname}/datastore/local/userSettings`, autoload: true });
            db.dataCollection = new Datastore({ filename: `${__dirname}/datastore/local/dataCollection`, autoload: true });
            var doc = { 
                        _id: '0000000000000001'
                    };
            db.userInfo.insert(doc, error => {   // Callback is optional
                if (error) {
                    return reject(error)
                }
                return resolve();
            });
        });
    })
}

exports.newUser = function(email, password, isRemembered) {
    return new Promise((reject, resolve) => {
        var db = {};
        db.userSettings = new Datastore({ filename: `${__dirname}/datastore/local/userSettings`, autoload: true });
        db.userInfo = new Datastore({ filename: `${__dirname}/datastore/local/userInfo`, autoload: true });

        var uInfoDoc = { 
           email: email,
           password: password,
           created_at: Math.round((new Date()).getTime() / 1000),
           session: false,
        };

        var uSettDoc = {
            isRemembered: isRemembered
        }

        db.userInfo.insert(uInfoDoc, error => {
            if (error) {
                return reject(error)
            }
            db.userSettings.insert(uSettDoc, error => {
                if (error) {
                    return reject(error)
                }
                return resolve();
            });
        });
    })
}