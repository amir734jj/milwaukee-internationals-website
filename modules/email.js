var _ = require('underscore');

module.exports = function(smtpTransport, rootURL) {

  return function(emailAddress, studentAttr) {
    var mail = {
      from: "Milwaukee internationals <amirhesamyan@gmail.com>",
      to: emailAddress,
      subject: "Email confirmation for tour of Milwaukee",
      text: "Email confirmation for tour of Milwaukee",
      html: _.template("                    \
        <p>Name:  <%= fullname %></p>       \
        <p>Email: <%= email %></p>          \
        <p>Major: <%= major %></p>          \
        <p>Phone: <%= phone %></p>          \
        <hr>                                \
        <p>See you in tour of Milwaukee</p> \
      ")(studentAttr)
    };

    smtpTransport.sendMail(mail, function(error, response) {
      if (error) {
        console.log("Email service is broken!" + error);
      }

      console.log("##########---EMAIL---###########");
      console.log(error);
      console.log(response);
      console.log("##########---EMAIL---###########");

      smtpTransport.close();
    });
  }
}
