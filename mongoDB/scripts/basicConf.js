// cursor = db.devices.find();
// while ( cursor.hasNext() ) {
//    printjson( cursor.next() );
// }

// equivalent for "use <db>" command in mongo shell
db = db.getSiblingDB('test')

// print the collections present in tutorialkart db
print(db.getCollectionNames())
// create an index to search devices by keyword
printjson(db.devices.createIndex({name: 'text', desc: 'text', type:'text' }));

var appName = {
    key: 'app_name',
    name: 'app name',
    value: 'device explorer'
}

printjson(db.params.insert(appName));
