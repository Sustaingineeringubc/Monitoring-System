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

exports.createSession = function(userId) {
    db.userInfo.find({ email: email }, (error, docs) => {
        if (error) {
            return reject(error)
        }
        if (docs.length === 0) {
            return resolve(false)
        }
        return resolve(true);
    })
}

exports.loginUser = function(email, password, isRemember) {
    return new Promise(async (resolve, reject) => {
        try {
            var db = {};
            db.userSettings =  new Datastore({ filename: `${__dirname}/datastore/local/userSettings`, autoload: true })
            const user = await find({ email: email, password: password }, 'userInfo')
            if (user.length === 0) {
                return reject('Incorrect email or password')
            }
            const setting = await find({ userId: user.Id}, 'userSettings')
            const uSettDoc = {
                userId: user[0]._id,
                isRemembered: isRemember
            }
            if (setting.length === 0) {
                db.userSettings.insert(uSettDoc, (error, newDoc)=> {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(true);
                });
            } else {
                db.userSettings.update(setting, uSettDoc, {}, (error, settingReplaced) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(true)
                })
            }

        } catch(error) {
            if (error) {
                return reject(error)
            }
        }
    })
}

exports.newUser = function(email, password) {
    return new Promise((resolve, reject) => {
        // Document object declaration
        var uInfoDoc = { 
            email: email,
            password: password,
            created_at: Math.round((new Date()).getTime() / 1000),
            session: false,
        };
        // Insert document into database
        let newDoc = await insert(uInfoDoc, "userInfo")
    })
}

//wrappers

var find = exports.find = function(object, tableName) {
    return new Promise((resolve, reject) => {
        var db = {};
            db.schema = new Datastore({ filename: `${__dirname}/datastore/local/${tableName}`, autoload: true });
            db.schema.find(object, (error, docs) => {
            if (error) {
                return reject(error)
            }
            return resolve(docs);
        })
    })
}

var insert = exports.insert = function(object, tableName) {
    return new Promise ((resolve, reject) => {
        var db = {};
            db.schema = new Datastore({ filename: `${__dirname}/datastore/local/${tableName}`, autoload: true });
            db.schema.insert(object, (error, newDoc) => {
                if (error) {
                    return reject(error)
                }
                return resolve(newDoc);
            })
    })
}

var update = exports.update = function(object, query, updateModifier, options, tableName) {
    return new Promise ((resolve,reject) => {
        var db = {};
            db.schema = new Datastore({ filename: `${__dirname}/datastore/local/${tableName}`, autoload: true });
            db.schema.update(query, updateModifier, options, (error, settingReplaced, affectedDocuments, upsert) => {
                if (error) {
                    return reject(error)
                }
            return resolve(settingReplaced, affectedDocuments, upsert);
            })
    })
}

var remove = exports.remove = function (object, options, tableName) {
    return new Promise ((resolve,reject) => {
        var db = {};
            db.schema = new Datastore({ filename: `${__dirname}/datastore/local/${tableName}`, autoload: true });
            db.schema.remove(options, (error, numRemoved) => {
                if (error) {
                    return reject(error)
                }
                return resolve(numRemoved);
            })
    })
}

var findOne = exports.findOne = function (object, tableName) {
    return new Promise ((resolve,reject) => {
        var db = {};
            db.schema = new Datastore({ filename: `${__dirname}/datastore/local/${tableName}`, autoload: true });
            db.schema.findOne(object, (error, doc) => {
                if (error) {
                    return reject(error)
                }
                return resolve(doc);
            })
    })
}

var count = exports.count = function (object, tableName) {
    return new Promise ((resolve,reject) => {
        var db = {};
            db.schema = new Datastore({ filename: `${__dirname}/datastore/local/${tableName}`, autoload: true });
            db.schema.count(object, (error, count) => {
                if (error) {
                    return reject(error)
                }
                return resolve(count);
            })
    })
}
