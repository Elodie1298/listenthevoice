'use strict';

var async = require('async');
var User = require('../api/models/user.model');
const sgMail = require('@sendgrid/mail');
var sendgridApiKey = "AAAAAAAAAAAAAAAAAAAAA";
var startDate = undefined;
sgMail.setApiKey(sendgridApiKey);


module.exports = function() {
  console.log('task email ...');  




  if ( startDate == undefined) {
    startDate == new Date();
  }
  User.find({"check" : false}, function(err,users) {
    if(err) {
      console.error('error searching for user');
      return;
    }
    if (users != undefined && users.length >= 1) {

      User.update({"check" : false}, { "$set": {"check": true} }, { multi: true }, function(err, data) {
        if(err) {
            console.error("error updating check user to true");
        }


      });

      var mailOptions = {
        to: [{
          email: 'catherine.cleder.ensim@gmail.com'
        }],
        from: {
          email :  'catherine.cleder.ensim@gmail.com',
          name : 'Application emotion'
        },
        subject: 'nouvelles emotions: '+ users.length + ' nouveau(x) testeurs',
        content:[{
        value: 'une ou des nouvelles emotions ont été rentrés dans la base : ' + users.length,
        type : "text/plain"
        },{
          type: "text/html",
          value: 'une ou des nouvelles emotions ont été rentrés dans la base : ' + users.length
        }]
      };

      //console.log("Email To Send : "+JSON.stringify(mailOptions));
      sgMail.send(mailOptions, function(err,info) {
        if (err ){
          console.log('erreur sending email  : '+err);
          return ;
        }
        else {
          console.log('Message sent : ' + JSON.stringify(info));
          return ;
        }
      });



    } else {
       console.log('pas de nouveau utilisateur');
       return;
    }

  });




}
