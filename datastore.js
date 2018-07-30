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

exports.findUser = function(email) {
    return new Promise((resolve, reject) => {
        var db = {};
        db.userInfo = new Datastore({ filename: `${__dirname}/datastore/local/userInfo`, autoload: true });

        db.userInfo.find({ email: email }, (error, docs) => {
            if (error) {
                return reject(error)
            }
            if (docs.length === 0) {
                return resolve(false)
            }
            return resolve(true);
        })
    })
}

exports.newUser = function(email, password, isRemembered) {
    return new Promise((resolve, reject) => {
        var db = {};
        db.userSettings = new Datastore({ filename: `${__dirname}/datastore/local/userSettings`, autoload: true });
        db.userInfo = new Datastore({ filename: `${__dirname}/datastore/local/userInfo`, autoload: true });

        var uInfoDoc = { 
           email: email,
           password: password,
           created_at: Math.round((new Date()).getTime() / 1000),
           session: false,
        };

        db.userInfo.insert(uInfoDoc, (error, newDoc) => {
            if (error) {
                console.log('rej', error)
                return reject(error)
            }
            console.log(newDoc)
            var uSettDoc = {
                userId: newDoc._id,
                isRemembered: isRemembered
            }
            db.userSettings.insert(uSettDoc, error => {
                if (error) {
                    console.log('rej', error)

                    return reject(error)
                }
                console.log('resolvingnew user')
                return resolve();
            });
        });

     

       
    })
}