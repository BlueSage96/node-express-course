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
  <!DOCTYPE html>
  <html>
  <body class="light-mode">
  <style>
    body {
      transition: background 0.3s, color 0.3s;
      padding: 20px;
    }

    body.light-mode {
      background-color: #fff;
      color: #000;
    }

     body.dark-mode {
      background-color: #000;
      color: #fff;
    }

    button {
      border: 1px solid gray;
    }

    .input {
      border: 1px solid gray;
      margin-left: 20px;
      background-color: black;
      color: white;
    }
  </style>
 
  <form method="POST" >
  <button id="toggleBtn">Toggle theme</button>
  </form>

 <script>
    const toggleBtn = document.getElementById("toggleBtn");
    const body = document.body;

    toggleBtn.addEventListener("click", () => {
       body.classList.toggle("dark-mode"); 
       body.classList.toggle("light-mode");  
       if (body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "Dark Mode";
      } else if (body.classList.contains("light-mode")) {
         toggleBtn.textContent = "Light Mode";
      }
    });
  </script>
  </body>
  </html>
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

server.listen(3000);
console.log("The server is listening on port 3000.");
