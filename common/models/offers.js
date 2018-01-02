'use strict';

module.exports = function(Offers) {


    Offers.getOffersByAds = function (id_ad, pagina, numElementPerPage, cb) {
        var ds = Offers.dataSource;
        var offset = (pagina - 1) * numElementPerPage;
        var sql = "SELECT * FROM offers WHERE id_ad="+id_ad+" ORDER BY id LIMIT " + numElementPerPage + " OFFSET " + offset;
        var params = [id_ad, pagina, numElementPerPage];

        ds.connector.query(sql, params, function (err, offers) {

            if (err) console.error(err);

            cb(err, offers);

        });
    }

    Offers.remoteMethod(
        'getOffersByAds',
        {
            http: { path: '/getOffersByAds', verb: 'get' },
            accepts: [{ arg: 'id_ad', type: 'number' }, { arg: 'pagina', type: 'number' }, { arg: 'numElementPerPage', type: 'number' }],
            returns: { arg: 'data', type: ['Offers'], root: true }
        }
    );


    Offers.countOffersByAds = function (id_ad, numElementPerPage, cb) {
        var ds = Offers.dataSource;
        var sql = "SELECT count(*) AS total, FLOOR((count(*)/"+numElementPerPage+")) AS pages FROM offers WHERE id_ad="+id_ad;

        var params = [id_ad, numElementPerPage];
        ds.connector.query(sql, params, function (err, offers) {

            if (err) console.error(err);

            cb(err, offers ? offers[0] : 0);

        });
    }

    Offers.remoteMethod(
        'countOffersByAds',
        {
            http: { path: '/countOffersByAds', verb: 'get' },
            accepts: [{ arg: 'id_ad', type: 'number' }, { arg: 'numElementPerPage', type: 'number' }],
            returns: { arg: 'data', type: 'Offers', root: true }
        }
    );
};
