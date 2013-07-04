// Generated by CoffeeScript 1.4.0
(function() {

  window.api_key = 'special-key';

  describe('SwaggerRequest', function() {
    beforeEach(function() {
      window.swagger = new SwaggerApi({
        discoveryUrl: 'http://localhost:8002/api/api-docs'
      });
      swagger.build();
      return waitsFor(function() {
        return swagger.ready != null;
      });
    });
    describe("execute get operations", function() {
      beforeEach(function() {
        window.body = null;
        window.response = null;
        window.callback = null;
        window.error = null;
        window.operation = swagger.pet.operations.getPetById;
        window.success_callback = function(data) {
          return window.response = data;
        };
        return window.error_callback = function(data) {
          return window.error = data;
        };
      });
      it("fetches an object with json", function() {
        var params, requestContentType, responseContentType;
        params = {
          headers: {}
        };
        requestContentType = null;
        responseContentType = "application/json";
        new SwaggerRequest("GET", "http://localhost:8002/api/pet/1", params, requestContentType, responseContentType, window.success_callback, window.error_callback, operation);
        return window.args = {
          petId: '1'
        };
      });
      waitsFor(function() {
        return window.response != null;
      });
      runs(function() {
        var pet;
        pet = JSON.parse(window.response);
        expect(pet).toBeDefined;
        expect(pet.id).toBe(1);
        return expect(window.error).toBe(null);
      });
      it("fetches an object with xml", function() {
        var params, requestContentType, responseContentType;
        params = {
          headers: {}
        };
        requestContentType = "application/xml";
        responseContentType = null;
        new SwaggerRequest("GET", "http://localhost:8002/api/pet/1", params, requestContentType, responseContentType, success_callback, error_callback, operation);
        return window.args = {
          petId: '1'
        };
      });
      waitsFor(function() {
        return window.response != null;
      });
      runs(function() {
        var parser, pet;
        parser = new DOMParser();
        pet = parser.parseFromString(window.response, "text/xml");
        return expect(pet).toBeDefined;
      });
      it("fetches an object with plain text", function() {
        var params, requestContentType, responseContentType;
        params = {
          headers: {}
        };
        requestContentType = "text/plain";
        responseContentType = "text/plain";
        new SwaggerRequest("GET", "http://localhost:8002/api/pet/1", params, requestContentType, responseContentType, success_callback, error_callback, operation);
        return window.args = {
          petId: '1'
        };
      });
      waitsFor(function() {
        return window.response != null;
      });
      runs(function() {
        var pet;
        pet = window.response;
        return expect(pet).toBe("Pet(category=Category(id=2, name=Cats), name=Cat 1, photoUrls=[url1, url2], tags=[Tag(id=1, name=tag1), Tag(id=2, name=tag2)], status=available)");
      });
      it("fetches an object as html", function() {
        var params, requestContentType, responseContentType;
        params = {
          headers: {}
        };
        requestContentType = null;
        responseContentType = "text/html";
        new SwaggerRequest("GET", "http://localhost:8002/api/pet/1", params, requestContentType, responseContentType, success_callback, error_callback, operation);
        return window.args = {
          petId: '1'
        };
      });
      waitsFor(function() {
        return window.response != null;
      });
      runs(function() {
        var pet;
        return pet = window.response;
      });
      it("handles redirects", function() {
        var params, requestContentType, responseContentType;
        params = {
          headers: {}
        };
        requestContentType = "application/json";
        responseContentType = null;
        new SwaggerRequest("GET", "http://localhost:8002/api/pet.redirect/3", params, requestContentType, responseContentType, success_callback, error_callback, operation);
        return window.args = {
          petId: '1'
        };
      });
      waitsFor(function() {
        return window.response != null;
      });
      return runs(function() {
        var pet;
        return pet = window.response;
      });
    });
    describe("execute post operations", function() {
      beforeEach(function() {
        window.body = null;
        window.response = null;
        window.callback = function() {
          return 'mock callback';
        };
        window.error = function() {
          return 'mock error';
        };
        return window.operation = swagger.pet.operations.getPetById;
      });
      it("adds an object with json", function() {
        var params, requestContentType, responseContentType;
        params = {
          headers: {},
          body: JSON.stringify({
            id: 100,
            name: "monster",
            status: "dead"
          })
        };
        requestContentType = "application/json";
        responseContentType = "application/json";
        return new SwaggerRequest("POST", "http://localhost:8002/api/pet", params, requestContentType, responseContentType, success_callback, error_callback, operation);
      });
      waitsFor(function() {
        return window.response != null;
      });
      runs(function() {
        var resp;
        resp = JSON.parse(window.response);
        console.log(resp);
        return expect(resp.code).toBe(200);
      });
      return it("adds an object with xml", function() {
        var params, requestContentType, responseContentType;
        params = {
          headers: {},
          body: "<Pet><id>101</id><category><id>2</id><name>Cats</name></category><name>Cat 1</name><photoUrls>url1</photoUrls><photoUrls>url2</photoUrls><tags><id>1</id><name>tag1</name></tags><tags><id>2</id><name>tag2</name></tags><status>available</status></Pet>"
        };
        requestContentType = "application/xml";
        responseContentType = "application/xml";
        new SwaggerRequest("POST", "http://localhost:8002/api/pet", params, requestContentType, responseContentType, success_callback, error_callback, operation);
        waitsFor(function() {
          return window.response != null;
        });
        return runs(function() {
          var resp;
          return resp = window.response;
        });
      });
    });
    describe("execute put operations", function() {
      beforeEach(function() {
        window.body = null;
        window.response = null;
        window.callback = function() {
          return 'mock callback';
        };
        window.error = function() {
          return 'mock error';
        };
        return window.operation = swagger.pet.operations.getPetById;
      });
      it("updates an object with json", function() {
        var params, requestContentType, responseContentType;
        params = {
          headers: {},
          body: JSON.stringify({
            id: 1,
            name: "monster",
            status: "alive"
          })
        };
        requestContentType = "application/json";
        responseContentType = "application/json";
        return new SwaggerRequest("PUT", "http://localhost:8002/api/pet", params, requestContentType, responseContentType, success_callback, error_callback, operation);
      });
      waitsFor(function() {
        return window.response != null;
      });
      runs(function() {
        var resp;
        resp = JSON.parse(window.response);
        return expect(resp.code).toBe(200);
      });
      it("updates an object with xml", function() {
        var params, requestContentType, responseContentType;
        params = {
          headers: {},
          body: "<Pet><id>1</id><category><id>2</id><name>Cats</name></category><name>Cat 1</name><photoUrls>url1</photoUrls><photoUrls>url2</photoUrls><tags><id>1</id><name>tag1</name></tags><tags><id>2</id><name>tag2</name></tags><status>available</status></Pet>"
        };
        requestContentType = "application/xml";
        responseContentType = "application/xml";
        return new SwaggerRequest("PUT", "http://localhost:8002/api/pet", params, requestContentType, responseContentType, success_callback, error_callback, operation);
      });
      waitsFor(function() {
        return window.response != null;
      });
      return runs(function() {
        var resp;
        resp = window.response;
        return console.log(resp);
      });
    });
    describe("execute delete operations", function() {
      beforeEach(function() {
        window.body = null;
        window.response = null;
        window.success_callback = function(data) {
          return window.response = data;
        };
        window.error_callback = function(data) {
          return window.error = data;
        };
        return window.operation = swagger.pet.operations.getPetById;
      });
      it("deletes an object", function() {
        var params;
        window.success_callback = function(data) {
          return window.response = "successfully deleted pet";
        };
        params = {};
        return new SwaggerRequest("DELETE", "http://localhost:8002/api/pet/100", params, null, null, success_callback, error_callback, operation);
      });
      waitsFor(function() {
        return window.response != null;
      });
      return runs(function() {
        var resp;
        resp = window.response;
        return expect(resp).toBe("successfully deleted pet");
      });
    });
    describe("execute options call", function() {
      beforeEach(function() {
        window.body = null;
        window.response = null;
        window.success_callback = function(data) {
          return window.response = data;
        };
        window.error_callback = function(data) {
          return window.error = data;
        };
        return window.operation = swagger.pet.operations.getPetById;
      });
      it("gets options on the pet resource", function() {
        var params;
        window.success_callback = function(data) {
          return window.response = "successfully fetched options";
        };
        params = {};
        return new SwaggerRequest("OPTIONS", "http://localhost:8002/api/pet", params, null, null, success_callback, error_callback, operation);
      });
      waitsFor(function() {
        return window.response != null;
      });
      return runs(function() {
        var resp;
        resp = window.response;
        return expect(resp).toBe("successfully fetched options");
      });
    });
    return describe("execute patch call", function() {
      beforeEach(function() {
        window.body = null;
        window.response = null;
        window.success_callback = function(data) {
          return window.response = data;
        };
        window.error_callback = function(data) {
          return window.error = data;
        };
        return window.operation = swagger.pet.operations.getPetById;
      });
      it("merges an object", function() {
        var params, requestContentType, responseContentType;
        window.success_callback = function(data) {
          return window.response = "successfully patched pet";
        };
        params = {
          body: JSON.stringify({
            name: "ghoul"
          })
        };
        requestContentType = null;
        responseContentType = "application/json";
        return new SwaggerRequest("PATCH", "http://localhost:8002/api/pet/3", params, requestContentType, responseContentType, success_callback, error_callback, operation);
      });
      waitsFor(function() {
        return window.response != null;
      });
      return runs(function() {
        var resp;
        resp = window.response;
        return expect(resp).toBe("successfully patched pet");
      });
    });
  });

}).call(this);