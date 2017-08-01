var _ = require('underscore');

module.exports = function(smtpTransport, rootURL) {

  return function(emailAddress, studentAttr) {
    var mail = {
      from: "Milwaukee Internationals <tourofmilwaukee@gmail.com>",
      to: emailAddress,
      subject: "Tour of Milwaukee - Confirmation",
      text: "Email confirmation for the Tour of Milwaukee",
      html: _.template("                    \
        <p>Name:  <%= fullname %></p>       \
        <p>Email: <%= email %></p>          \
        <p>Major: <%= major %></p>          \
        <p>Phone: <%= phone %></p>          \
        <hr>                                \
        <p>See you at the Tour of Milwaukee</p> \
        <br>                                    \
        <p>2017 Tour of Milwaukee Registeration</p> \
        <p> Date: August 26, 2017</p> \
        <p> Time: 12:00 noon</p> \
        <p> Address: 2200 E Kenwood Blvd, Milwaukee, WI 53211 </p> \
        <p> Location: Union Ballroom</p> \
        <p> Thank you for registering for this event. Please share this with other new international friends.</p> \
        <p> If you need any sort of help (furniture, moving, etc.), please contact Asher Imtiaz (414-499-5360) or Amanda Johnson (414-801-4431) on campus.</p> \
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
