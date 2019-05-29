var express = require('express')
  , bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({limit:'50mb', extended: true}));

app.post('/', function(request, response){

    var orderJSON = function(inputText)
    {
      var result = inputText;
      try {
        var o = JSON.parse(inputText);
        result = JSON.stringify(o,replacer(o), 5);
      } catch (e)
      {
        console.log(e);
        result = inputText;
        result = e;
      }
      return result;
    };

    var isArray = function (value) {
      return value && typeof value === 'object' && value.constructor === Array;
    }

    var isString = function (value) {
      return typeof value === 'string' || value instanceof String;
    };
    
  // Returns if a value is an object
  function isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }
    var isPrimitive = function (test) {
      return !(isString(test));
    };
    var replacer = function(o)
    {
      var keys = [];
      var properties = Object.keys(o);
      keys = keys.concat(properties);
      properties.forEach(function(property){
        if(isObject(o[property]) || isArray(o[property]))
        {
          keys = keys.concat(replacer(o[property]));
        }
      });
      
      return keys.sort();
    };

    

    var outputText = orderJSON(JSON.stringify(request.body));

    response.send(outputText);

});

app.listen(3000, ()=>{
  console.log("listening on port 3000");
});
