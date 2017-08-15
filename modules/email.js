var _ = require('underscore');

module.exports = function(smtpTransport, rootURL) {
  var self = this;

  this.sendMail = function(mail) {
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
  };

  this.sendMailToStudent = function(emailAddress, studentAttr) {
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
        <p> 2017 Tour of Milwaukee Registration</p> \
        <p> Date: August 26, 2017</p> \
        <p> Time: 12:00 noon</p> \
        <p> Address: 2200 E Kenwood Blvd, Milwaukee, WI 53211 </p> \
        <p> Location: Union Ballroom</p> \
        <p> Thank you for registering for this event. Please share this with other new international friends.</p> \
        <p> If you need any sort of help (furniture, moving, etc.), please contact Asher Imtiaz (414-499-5360) or Amanda Johnson (414-801-4431) on campus.</p> \
      ")(studentAttr)
    };

    self.sendMail(mail);

  };


  this.sendMailToDrivers = function(driversBucket) {
    driversBucket.map(function(driver) {
      if (!driver.students.length) {
        return;
      }

      var mail = {
        from: "Milwaukee Internationals <tourofmilwaukee@gmail.com>",
        to: driver.email,
        subject: "Tour of Milwaukee - Confirmation",
        text: "Email confirmation for the Tour of Milwaukee",
        html: _.template("                                                                                \
        <ul>                                                                                              \
        <% _.each(students, function(student){ %>                                                         \
            <li><%= student.fullname %></li>                                                              \
        <% }); %>                                                                                         \
        </ul>                                                                                             \
        ")({
          students: driver.students
        })
      };

      self.sendMail(mail);
    });
  };



  this.sendMailToHosts = function(hostsBucket) {
    console.log("HERE!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(hostsBucket);


    hostsBucket.map(function(host) {
      var mail = {
        from: "Milwaukee Internationals <tourofmilwaukee@gmail.com>",
        to: host.email,
        subject: "Tour of Milwaukee - Confirmation",
        text: "Email confirmation for the Tour of Milwaukee",
        html: _.template("                                                                                \
        <% if (drivers.length == 0) { %>                                                                  \
            <p>No driver is assigned to your home.</p>                                                    \
        <% } %>                                                                                           \
        <ul>                                                                                              \
        <% if (drivers.length > 0) { %>                                                                   \
            <% _.each(drivers, function(driver){ %>                                                       \
              <li><%= driver.fullname %></li>                                                             \
            <% }); %>                                                                                     \
        <% } %>                                                                                           \
        </ul>                                                                                             \
        ")({
          drivers: host.drivers
        })
      };

      self.sendMail(mail);
    });
  };

  return self;
};
