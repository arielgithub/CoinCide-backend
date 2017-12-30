'use strict';

module.exports = function (Ads) {


    Ads.getAdsPag = function (pagina, numElementPerPage, cb) {
        var ds = Ads.dataSource;
        var offset = (pagina - 1) * numElementPerPage;
        var sql = "SELECT * FROM ads ORDER BY id LIMIT " + numElementPerPage + " OFFSET " + offset;
        var params = [pagina, numElementPerPage];

        ds.connector.query(sql, params, function (err, ads) {

            if (err) console.error(err);

            cb(err, ads);

        });
    }

    Ads.remoteMethod(
        'getAdsPag',
        {
            http: { path: '/getAdsPag', verb: 'get' },
            accepts: [{ arg: 'pagina', type: 'number' }, { arg: 'numElementPerPage', type: 'number' }],
            returns: { arg: 'data', type: ['Ads'], root: true }
        }
    );


    Ads.countAdsPag = function (numElementPerPage, cb) {
        var ds = Ads.dataSource;
        var sql = "SELECT count(*) AS total, FLOOR((count(*)/"+numElementPerPage+")) AS pages FROM ads";

        ds.connector.query(sql, function (err, ads) {

            if (err) console.error(err);

            cb(err, ads[0]);

        });
    }

    Ads.remoteMethod(
        'countAdsPag',
        {
            http: { path: '/countAdsPag', verb: 'get' },
            accepts: [{ arg: 'numElementPerPage', type: 'number' }],
            returns: { arg: 'data', type: 'Ads', root: true }
        }
    );


};
