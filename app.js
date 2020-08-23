const express = require("express");
const https = require("http"); //use of api
const bodyParser = require("body-parser"); //input from user

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public")); //static files like img or css links

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("index");//from any folder to choose a file
});

app.post("/",function(req,res){

  const query = req.body.cityname; //input from user
  const apikey = "68bb1a54747529b96d42a5081d91e079";
  const unit = "metric"; //temp in celcius
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apikey+ "&units=" +unit;
  https.get(url, function(response){

    console.log(response.statusCode);
    response.on("data", function(data){

      const weatherData = JSON.parse(data); //hexa decimal data to string
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
  //   res.write("<p style>The weather is currently "+ weatherDescription+"</p>");
  //   res.write("<h1>The temperature in " +query+ " is "+temp+" degree celcius</h1>");
  //   res.write("<img src="+imgURL+">");
     res.render("weather", {weatherDes: weatherDescription, queryValue: query, temperature:temp, imageURL: imgURL});
    });
  });
});

app.get("/work", function(req,res){
  res.render("work");
});

app.listen(3000,function(){
  console.log("server running");
});
