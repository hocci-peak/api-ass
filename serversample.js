var http = require("http");
var fs = require("fs");
var qs = require("querystring");

const { MongoClient } = require("mongodb");
var mongoClient = require("mongodb").MongoClient;
const { strict } = require("assert");
var dbUrl = "mongodb://127.0.0.1:27017/";
// var dbUrl = "mongodb+srv://peak:the123@cluster0.fkaoh.mongodb.net/peak?retryWrites=true&w=majority";
// const client = new MongoClient(dbUrl, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

async function getValueForNextSequence(sequenceOfName) {
  //   var sequenceDoc = db.sample.findAndModify({
  //     query: { _id: sequenceOfName },
  //     update: { $inc: { sequence_value: 1 } },
  //     new: true,
  //   });

  //   var sequenceDoc;
  await mongoClient.connect(
    dbUrl,
    { useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("peak");
      console.log("next");
      const query = { _id: sequenceOfName };
      const update = { $inc: { sequence_value: 1 } };
      // const update = { password: sequence_value };
      const options = { new: true };
      dbo
        .collection("todolist")
        .findOneAndUpdate(query, update, options)
        .then((updatedDocument) => {
          if (updatedDocument) {
            console.log(`Successfully updated document: ${updatedDocument}.`);
          } else {
            console.log("No document matches the provided query.");
          }
          console.log(updatedDocument.value.sequence_value);
          return updatedDocument.value.sequence_value;
        })
        .catch((err) =>
          console.error(`Failed to find and update document: ${err}`)
        );
    }
  );
}

//create a server object:
http
  .createServer(function (req, res) {
    if (req.url === "/apple") {
      res.write("Hello World!"); //write a response to the client
      res.end(); //end the response
    } else if (req.url === "/orange") {
      sendFileContent(res, "webjquery.html", "text/html");
    } else if (req.url === "/") {
      console.log("affdsafdjs");
      sendFileContent(res, "index.html", "text/html");
    } else if (req.url === "/list") {
      sendFileContent(res, "list.html", "text/html");
    } else if (req.url === "/covid19") {
      sendFileContent(res, "covid19.html", "text/html");
    } else if (req.url === "/todolist") {
      if (req.method === "POST") {
        console.log("POST: todolist");
        return req.on("data", function (data) {
          var formData = "";
          formData += data;

          return req.on("end", function () {
            var newdata = qs.parse(formData);
            mongoClient.connect(
              dbUrl,
              { useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                var dbo = db.db("peak");
                console.log(newdata["userId"]);
                // var query = { name: mData.login, password: mData.password };
                dbo
                  .collection("todolist")
                  .find({ userId: newdata["userId"] })
                  .toArray(function (err, result) {
                    if (err) throw err;
                    console.log("comment find");
                    console.log(JSON.stringify(result));
                    db.close();
                    if (result) {
                      return res.end(JSON.stringify(result));
                    } else {
                      return res.end(
                        JSON.stringify({ result: "data not find" })
                      );
                    }
                  });
              }
            );
          });
        });
      } else {
        res.end("can't connect database");
      }
    } else if (req.url === "/addlistItems") {
      if (req.method === "POST") {
        console.log("todoTT");
        var formData = "";
        return req.on("data", function (data) {
          formData = "";
          formData += data;
          console.log(formData);
          var newData = data;
          return req.on("end", function () {
            var newdata = qs.parse(formData);

            mongoClient.connect(
              dbUrl,
              { useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                var dbo = db.db("peak");
                console.log("next");
                const query = { userId: newdata["userId"] };
                const update = {
                  $addToSet: {
                    tasks: {
                      task: newdata["task"],
                      isChecked: newdata["isChecked"],
                    },
                  },
                };
                const options = { upsert: true };
                dbo
                  .collection("todolist")
                  .findOneAndUpdate(query, update, options)
                  .then((updatedDocument) => {
                    if (updatedDocument) {
                      console.log(
                        `Successfully updated document: ${updatedDocument}.`
                      );
                    } else {
                      console.log("No document matches the provided query.");
                    }
                    db.close();
                    res.end(
                      JSON.stringify({
                        success: true,
                        msg: "Item added",
                        data: updatedDocument,
                      })
                    );
                  })
                  .catch((err) =>
                    console.error(`Failed to find and update document: ${err}`)
                  );
              }
            );
          });
        });
      } else {
        res.end(JSON.stringify({ success: false, msg: "Add fail " }));
      }
    } else if (req.url === "/editlistItems") {
      if (req.method === "PUT") {
        console.log("edit todo");
        var formData = "";
        return req.on("data", function (data) {
          formData = "";
          formData += data;
          console.log(formData);
          return req.on("end", function () {
            var newdata = qs.parse(formData);

            mongoClient.connect(
              dbUrl,
              { useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                var dbo = db.db("peak");
                console.log("next");
                var taskIndex = (Number(newdata["itemId"]) - 1).toString();
                var newUpdate = "tasks." + taskIndex + ".content";
                const query = { userId: newdata["userId"] };
                var myTask = {
                  task: newdata["task"],
                  isChecked: newdata["isChecked"],
                };
                const update = {
                  $set: {
                    [`tasks.${taskIndex}`]: myTask,
                  },
                };

                const options = {};
                dbo
                  .collection("todolist")
                  .findOneAndUpdate(query, update, options)
                  .then((updatedDocument) => {
                    if (updatedDocument) {
                      console.log(
                        `Successfully updated document: ${updatedDocument}.`
                      );
                    } else {
                      console.log("No document matches the provided query.");
                    }
                    db.close();
                    res.end(
                      JSON.stringify({
                        success: true,
                        msg: "Item edit",
                        data: updatedDocument,
                      })
                    );
                  })
                  .catch((err) =>
                    console.error(`Failed to find and update document: ${err}`)
                  );
              }
            );
          });
        });
      } else {
        res.end(JSON.stringify({ success: false, msg: "Add fail " }));
      }
    } else if (req.url === "/deletelistItems") {
      if (req.method === "DELETE") {
        console.log("delete todo");
        var formData = "";
        return req.on("data", function (data) {
          formData = "";
          formData += data;
          console.log(formData);
          return req.on("end", function () {
            var newdata = qs.parse(formData);

            mongoClient.connect(
              dbUrl,
              { useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                var dbo = db.db("peak");
                console.log("next");
                var taskIndex = Number(newdata["itemId"]) - 1;
                const query = { userId: newdata["userId"] };
                const update = {
                  $unset: {
                    [`tasks.${taskIndex}`]: 1,
                  },
                };

                const options = {};
                dbo
                  .collection("todolist")
                  .findOneAndUpdate(query, update, options)
                  .then((updatedDocument) => {
                    dbo
                      .collection("todolist")
                      .findOneAndUpdate(
                        query,
                        { $pull: { tasks: null } },
                        options
                      )
                      .then((updatedDocument) => {
                        if (updatedDocument) {
                          console.log(
                            `Successfully updated document: ${updatedDocument}.`
                          );
                        } else {
                          console.log(
                            "No document matches the provided query."
                          );
                        }
                        db.close();
                        res.end(
                          JSON.stringify({
                            success: true,
                            msg: "Item delete",
                            data: updatedDocument,
                          })
                        );
                      });
                  })
                  .catch((err) =>
                    console.error(`Failed to find and update document: ${err}`)
                  );
              }
            );
          });
        });
      } else {
        res.end(JSON.stringify({ success: false, msg: "Add fail " }));
      }
    } else if (req.url === "/login") {
      sendFileContent(res, "login.html", "text/html");
    } else if (req.url === "/check_signin") {
      console.log("Requested URL is url" + req.url);
      if (req.method === "POST") {
        formData = "";
        return req.on("data", function (data) {
          formData = "";
          formData += data;
          console.log(formData);
          return req.on("end", function () {
            var user;
            var mData;
            // data = qs.parse(formData);
            mData = JSON.parse(data);
            // user = data['login'];
            // pwd = data['password']
            // result = user + ' ' + pwd;
            // console.log(mData.login);
            var returnData = "hello";
            mongoClient.connect(
              dbUrl,
              { useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                var dbo = db.db("peak");
                var myobj = {
                  name: mData.login,
                  email: mData.email,
                  password: mData.password,
                };
                dbo
                  .collection("users")
                  .insertOne(myobj, function (err, result) {
                    if (err) throw err;
                    console.log(result.insertedId.toString());
                    returnData = result.insertedId.toString()
                    console.log("1 document inserted");
                    res.end(
                      JSON.stringify({
                        result: "success",
                        data: returnData,
                        username: mData.login,
                      })
                    );
                    db.close();
                  });
              }
            );
            
          });
        });
      } else {
        res.end("abc");
      }
    } else if (req.url === "/check_login") {
      console.log("Requested URL is url" + req.url);
      if (req.method === "POST") {
        formData = "";
        return req.on("data", function (data) {
          formData = "";
          formData += data;
          console.log(formData);
          return req.on("end", function () {
            var user;
            var mData;
            // data = qs.parse(formData);
            mData = JSON.parse(data);
            // user = data['login'];
            // pwd = data['password']
            // result = user + ' ' + pwd;
            // console.log(mData.login);
            mongoClient.connect(
              dbUrl,
              { useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                var dbo = db.db("peak");
                var query = { name: mData.login, password: mData.password };
                console.log(query);
                dbo
                  .collection("users")
                  .find(query)
                  .toArray(function (err, result) {
                    if (err) throw err;
                    console.log("comment find");
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));
                    db.close();
                  });
              }
            );
          });
        });
      } else {
        res.end("abc");
      }
    } else if (/^\/[a-zA-Z0-9\/-/]*.js$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/javascript");
    } else if (/^\/[a-zA-Z0-9\/-/]*.bundle.min.js$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/javascript");
    } else if (/^\/[a-zA-Z0-9\/-/]*.css$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/css");
    } else if (/^\/[a-zA-Z0-9\/-]*.min.css$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/css");
    } else if (/^\/[a-zA-Z0-9\/-]*.jpg$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "image/jpg");
    } else if (/^\/[a-zA-Z0-9-._\/]*.min.js$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/javascript");
    } else if (/^\/[a-zA-Z0-9-]*.min.css.map$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/map");
    } else if (/^\/[a-zA-Z0-9\/-/]*.min.js.map$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/map");
    } else if (/^\/[a-zA-Z0-9\/-/]*.css.map$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/map");
    } else if (/^\/[a-zA-Z0-9\/-/]*.svg$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "image/svg+xml");
    } else if (/^\/[a-zA-Z0-9\/-/]*.png$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "image/png");
    } else if (/^\/[a-zA-Z0-9\/-/]*.ico$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/ico");
    } else if (/^\/[a-zA-Z0-9\/-/?]*.ttf$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/font");
    } else if (/^\/[a-zA-Z0-9\/-/?]*.woff$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/woff");
    } else if (/^\/[a-zA-Z0-9\/-/?]*.woff2$/.test(req.url.toString())) {
      sendFileContent(res, req.url.toString().substring(1), "text/woff2");
    } else {
      console.log("Requested URL is: " + req.url);
      res.end();
    }
  })
  .listen(9998); //the server object listens on port 8080

function sendFileContent(response, fileName, contentType) {
  fs.readFile(fileName, function (err, data) {
    if (err) {
      response.writeHead(404);
      response.write("Not Found!");
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.write(data);
    }
    response.end();
  });
}
