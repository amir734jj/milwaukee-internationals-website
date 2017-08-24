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


  this.sendMailUtility = function(emailList, values) {

    emailList.map((email) => {
      var mail = {
        from: "Milwaukee Internationals <tourofmilwaukee@gmail.com>",
        to: email,
        subject: values.subject,
        text: "Milwaukee Internationals <tourofmilwaukee@gmail.com>",
        html: values.text
      };

      self.sendMail(mail);
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
        subject: "Tour of Milwaukee - Assigned Students",
        text: "Re Tour of Milwaukee",
        html: _.template("                                                      \
        <p> This is an automatically generated email. </p>                      \
        <p> ----------------------------------------- </p>                      \
        <br>                                                                    \
        <p> Your Driver ID: <%= driver.displayId %></p>                         \
        <ul>                                                                    \
        <% _.each(students, function(student){ %>                               \
            <li><%= student.fullname %> (<%= student.country %>)</li>           \
            <br>                                                                \
        <% }); %>                                                               \
        </ul>                                                                   \
        <br>                                                                    \
        <% if (host) { %>                                                       \
          <p> Host Name: <%= host.fullname %> </p>                              \
          <p> Host Contact: <%= host.phone %> </p>                              \
          <p> Host Address: <%= host.address %> </p>                            \
        <% } %>                                                                 \
        <br>                                                                    \
        <br>                                                                    \
        <p> Thank you for helping with the tour this year. Reply to this email will be sent automatically to the team.</p>      \
        <p> For questions, comments and feedback, please contact Asher Imtiaz (414-499-5360) or Marie Wilke (414-852-5132).</p> \
        ")({
          "students": driver.students,
          "host": driver.host,
          "driver": driver
        })
      };

      self.sendMail(mail);
    });
  };



  this.sendMailToHosts = function(hostsBucket) {
    hostsBucket.map(function(host) {
      var mail = {
        from: "Milwaukee Internationals <tourofmilwaukee@gmail.com>",
        to: host.email,
        subject: "Tour of Milwaukee - Assigned Drivers",
        text: "Email confirmation for the Tour of Milwaukee",
        html: _.template("                                                                                \
        <p> This is an automatically generated email. </p>                                                \
        <p> ----------------------------------------- </p>                                                \
        <% if (drivers.length == 0) { %>                                                                  \
            <p>No driver is assigned to your home.</p>                                                    \
        <% } %>                                                                                           \
        <h3>List of drivers and assigned students</h3>                                                    \
        <ul>                                                                                              \
        <% if (drivers.length > 0) { %>                                                                   \
            <% _.each(drivers, function(driver){ %>                                                       \
              <li>                                                                                        \
                <%= driver.fullname %> ( No. of students: <%= driver.students.length %>):                 \
                <ul>                                                                                      \
                  <% _.each(driver.students, function(student){ %>                                        \
                      <li><%= student.fullname %> (<%= student.country %>)</li>                           \
                  <% }); %>                                                                               \
                </ul>                                                                                     \
              </li>                                                                                       \
            <% }); %>                                                                                     \
        <% } %>                                                                                                                \
        </ul>                                                                                                                  \
        <br>                                                                                                                   \
        <p> Thank you for helping with the tour this year. Reply to this email will be sent automatically to the team.</p>                   \
        <p> For questions, comments and feedback, please contact Asher Imtiaz (414-499-5360) or Marie Wilke (414-852-5132).</p> \
        ")({
          drivers: host.drivers
        })
      };

      self.sendMail(mail);
    });
  };


  this.sendMailRegisterPerson = function(person) {
    var mail = {
      from: "Milwaukee Internationals <tourofmilwaukee@gmail.com>",
      to: person.email,
      subject: "Tour of Milwaukee - Signup Confirmation",
      text: "Email confirmation for the Tour of Milwaukee",
      html: _.template("                                                                                \
      <p> This is an automatically generated email. </p>                                                \
      <p> ----------------------------------------- </p>                                                \
      <p> Name: <%= person.fullname %></p>                                                                    \
      <p> Role: <%= person.role.charAt(0).toUpperCase() + person.role.slice(1) %></p>                                        \
      <% if (person.role == 'host') { %>                                                                  \
          <p> Address: <%= person.address %></p>                                        \
      <% } %>   \
      <% if (person.role == 'driver') { %>                                                                  \
          <p> Total Seats: <%= person.totalSeats %></p>                                        \
      <% } %>   \
      <br>                                                                                                                   \
      <br>                                                                                                                   \
      <p> 2017 Tour of Milwaukee</p> \
      <p> Date: August 26, 2017</p> \
      <p> Time: 12:30 pm (Brief orientation only for drivers and navigators) </p> \
      <p> Address: 2200 E Kenwood Blvd, Milwaukee, WI 53211 </p> \
      <p> Location: Union Ballroom</p> \
      <br>                                                                      \
      <p> Thank you for helping with the tour this year. Reply to this email will be sent automatically to the team.</p>     \
      <p> For questions, comments and feedback, please contact Asher Imtiaz (414-499-5360) or Marie Wilke (414-852-5132).</p> \
      <br>                                                                                                                   \
      <p> Blessings, </p> \
      ")({
        "person": person
      })
    };

    self.sendMail(mail);
  };

  return self;
};
