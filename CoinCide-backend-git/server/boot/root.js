'use strict';

module.exports = function (server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);



  var ds = server.dataSources.coinCide;
  var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role', 'ads', 'currencies', 'offers', 'proposals', 'users'];
  ds.autoupdate(lbTables, function (er) {
    if (er) throw er;
    console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  });
  ds.disconnect();

};
