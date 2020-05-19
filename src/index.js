const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const port_assign = process.env.PORT || 8080;
app.listen(port_assign, function() {
  console.log(`Server Started ${port_assign} Port`);
});

app.get("/", function(req, res) {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/", function(req, res) {
  const firstNAme = req.body.firstName;
  const lastNAme = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstNAme, LNAME: lastNAme }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = `https://us18.api.mailchimp.com/3.0/lists/${list_id}`;
  const options = {
    method: "POST",
    auth: `victor:${fail_key}`
  };

  const request = https.request(url, options, function(response) {
    if (response.statusCode == 200) {
      res.sendFile(`${__dirname}/success.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }
    response.on("data", function(data) {
      console.log("-------------------------------------------------");
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

// API Key
const api_key = "04f9fda8004482ce252b34d6ad0c7f51-us18";
const fail_key = "04f9fda8004482ce252b34d6ad0c8";
// List id
const list_id = "c7fa05be8d";
