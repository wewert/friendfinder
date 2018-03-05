var friendList = require('../data/friends.js');

module.exports = function(app){
  app.get('/api/friends', function(req,res) {
    res.json(friendList);
  });

  app.post('/api/friends', function(req,res) {
    var score = req.body.scores;
    var scoresArray = [];
    var match = 0;

    for(var i = 0; i < friendList.length; i++) {
      var difference = 0;
      for(var j = 0; j < score.length; j++) {
        difference += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(score[j])));
      }

      scoresArray.push(difference);
    }

    for(var i = 0; i < scoresArray.length; i++) {
      if(scoresArray[i] <= scoresArray[match]) {
        match = i;
      }
    }

    var theOne = friendList[match];
    res.json(theOne);

    friendList.push(req.body);
  });
};
