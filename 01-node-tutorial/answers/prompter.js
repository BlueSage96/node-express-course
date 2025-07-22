const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter something below.";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${item}</p>
  <form method="POST">
  <select name="countries">
  </select>

  <select name="cities" disabled>
      <option value=""> Choose a city </option>
  </select>
  <input name="item"></input>
  <button type="submit">Submit</button>
  </form>

  <script>
  let countriesData = { 
     "United States" : ["New York City", "Los Angeles", "Miami", "Chicago"],
     "Italy" : ["Rome", "Milan", "Turin", "Pompeii"],
     "Egypt" : ["Cairo", "Thebes", "Alexandria", "Giza"],
     "Japan" : ["Tokyo", "Kyoto", "Osaka", "Kobe"], 
     "Spain" : ["Madrid", "Barcelona", "Valencia","Murica"]
  };

  let form = document.forms[0];
  let countriesDropDown = form.countries;
  let citiesDropDown = form.cities;
  let jsonData;

  function getCountries(jsonData) {
    let out = "";
    out += '<option value="">Choose a country</option>';
    for (let country in jsonData) {
      out += '<option value="'+ country + '">'+ country +'</option>';
    }
      countriesDropDown.innerHTML = out;
  }

  function getCities() {
    let country = countriesDropDown.value;
    if (country.trim() === "") {
        //disabled if a country isn't selected
        citiesDropDown.disabled = true;
        // show "Choose a city"
        citiesDropDown.selectedIndex = 0;
        return false;//stop execution after selecting a city
    }
      let cities = jsonData[country];
      let out = "";
      out += '<option value="">Choose a city</option>';

      for (let city of cities) {
        out += '<option value="'+ city + '">'+ city +'</option>';
      }
      citiesDropDown.innerHTML = out;
      citiesDropDown.disabled = false;
  }

  jsonData = countriesData;
  getCountries(jsonData);
  countriesDropDown.addEventListener("change", getCities);
  
  </script>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["item"]) {
        item = body["item"];
      } else {
        item = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("Event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");
