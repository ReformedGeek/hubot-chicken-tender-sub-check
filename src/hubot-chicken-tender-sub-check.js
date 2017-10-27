// Description:
//   Displays whether Publix chicken tender subs are presently on sale.
// Configuration:
//  N/A
// Commands:
//  hubot pubsub - Reply with whether or not Publix chicken tender subs are on sale.
// Author:
//   Bill Carlisle <billc@akamai.com>


module.exports = function(robot) {
  const PUB_SUB_SITE = 'http://arepublixchickentendersubsonsale.com/';
  robot.respond(/pubsub/i, function(msg) {

    function processPubSubCheck(err, res, body) {
      if (err || res.statusCode != 200) {
        msg.send("Something's wrong with the site! Sorry! :(");
        console.log(err, res.statusCode);
        return;
      }

      if (body.match(/<!-- onsale:yes -->/)) {
        msg.send("Awww yeah! Publix chicken tender subs are on sale! 8-)");
        return;
      }
      else {
        msg.send("Sadly, Publix chicken tender subs are not on sale! :'(");
        return;
      }
    }

    robot.http(PUB_SUB_SITE).get()(processPubSubCheck);
  });
};
