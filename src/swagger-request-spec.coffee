window.api_key = 'special-key'

describe 'SwaggerRequest', ->
  
  beforeEach ->
    window.swagger = new SwaggerApi({discoveryUrl: 'http://localhost:8002/api/api-docs'})
    swagger.build()
    waitsFor ->
      swagger.ready?

  describe "execute get operations", ->

    beforeEach ->
      window.body = null
      window.response = null
      window.callback = null
      window.error = null
      window.operation = swagger.pet.operations.getPetById
      window.success_callback = (data) ->
        window.response = data
      window.error_callback = (data) ->
        window.error = data

    it "fetches an object with json", ->
      params = {
        headers: {}
      }
      requestContentType = null
      responseContentType = "application/json"

      new SwaggerRequest("GET", "http://localhost:8002/api/pet/1", params, requestContentType, responseContentType, window.success_callback, window.error_callback, operation)

      window.args =
        petId: '1'

     waitsFor ->
       window.response?

      runs ->
        pet = JSON.parse(window.response)

        expect(pet).toBeDefined
        expect(pet.id).toBe 1
        expect(window.error).toBe null

    it "fetches an object with xml", ->
      params = {
        headers: {}
      }
      requestContentType = "application/xml"
      responseContentType = null

      new SwaggerRequest("GET", "http://localhost:8002/api/pet/1", params, requestContentType, responseContentType, success_callback, error_callback, operation)

      window.args =
        petId: '1'

     waitsFor ->
       window.response?

      runs ->
        parser = new DOMParser()
        pet = parser.parseFromString( window.response, "text/xml" )
        #pet = window.response
        expect(pet).toBeDefined
        #expect(pet.id).toBe 1

    it "fetches an object with plain text", ->
      params = {
        headers: {}
      }
      requestContentType = "text/plain"
      responseContentType = "text/plain"

      new SwaggerRequest("GET", "http://localhost:8002/api/pet/1", params, requestContentType, responseContentType, success_callback, error_callback, operation)

      window.args =
        petId: '1'

     waitsFor ->
       window.response?

      runs ->
        pet = window.response
        #console.log pet
        expect(pet).toBe "Pet(category=Category(id=2, name=Cats), name=Cat 1, photoUrls=[url1, url2], tags=[Tag(id=1, name=tag1), Tag(id=2, name=tag2)], status=available)"

    it "fetches an object as html", ->
      params = {
        headers: {}
      }
      requestContentType = null
      responseContentType = "text/html"

      new SwaggerRequest("GET", "http://localhost:8002/api/pet/1", params, requestContentType, responseContentType, success_callback, error_callback, operation)

      window.args =
        petId: '1'

     waitsFor ->
       window.response?

      runs ->
        pet = window.response

    it "handles redirects", ->
      params = {
        headers: {}
      }
      requestContentType = "application/json"
      responseContentType = null

      new SwaggerRequest("GET", "http://localhost:8002/api/pet.redirect/3", params, requestContentType, responseContentType, success_callback, error_callback, operation)

      window.args =
        petId: '1'

     waitsFor ->
       window.response?

      runs ->
        pet = window.response


  describe "execute post operations", ->

    beforeEach ->
      window.body = null
      window.response = null
      window.callback = ->
        'mock callback'
      window.error = ->
        'mock error'
      window.operation = swagger.pet.operations.getPetById

    it "adds an object with json", ->
      params = {
        headers: {}
        body: JSON.stringify({
          id: 100
          name: "monster"
          status: "dead"
        })
      }
      requestContentType = "application/json"
      responseContentType = "application/json"

      new SwaggerRequest("POST", "http://localhost:8002/api/pet", params, requestContentType, responseContentType, success_callback, error_callback, operation)

     waitsFor ->
       window.response?

      runs ->
        resp = JSON.parse(window.response)
        console.log resp
        expect(resp.code).toBe 200

    it "adds an object with xml", ->
      params = {
        headers: {}
        body: "<Pet><id>101</id><category><id>2</id><name>Cats</name></category><name>Cat 1</name><photoUrls>url1</photoUrls><photoUrls>url2</photoUrls><tags><id>1</id><name>tag1</name></tags><tags><id>2</id><name>tag2</name></tags><status>available</status></Pet>"
      }
      requestContentType = "application/xml"
      responseContentType = "application/xml"

      new SwaggerRequest("POST", "http://localhost:8002/api/pet", params, requestContentType, responseContentType, success_callback, error_callback, operation)

      waitsFor ->
        window.response?

      runs ->
        resp = window.response

  describe "execute put operations", ->

    beforeEach ->
      window.body = null
      window.response = null
      window.callback = ->
        'mock callback'
      window.error = ->
        'mock error'
      window.operation = swagger.pet.operations.getPetById

    it "updates an object with json", ->
      params = {
        headers: {}
        body: JSON.stringify({
          id: 1
          name: "monster"
          status: "alive"
        })
      }
      requestContentType = "application/json"
      responseContentType = "application/json"

      new SwaggerRequest("PUT", "http://localhost:8002/api/pet", params, requestContentType, responseContentType, success_callback, error_callback, operation)

     waitsFor ->
       window.response?

      runs ->
        resp = JSON.parse(window.response)
        expect(resp.code).toBe 200

    it "updates an object with xml", ->
      params = {
        headers: {}
        body: "<Pet><id>1</id><category><id>2</id><name>Cats</name></category><name>Cat 1</name><photoUrls>url1</photoUrls><photoUrls>url2</photoUrls><tags><id>1</id><name>tag1</name></tags><tags><id>2</id><name>tag2</name></tags><status>available</status></Pet>"
      }
      requestContentType = "application/xml"
      responseContentType = "application/xml"

      new SwaggerRequest("PUT", "http://localhost:8002/api/pet", params, requestContentType, responseContentType, success_callback, error_callback, operation)

     waitsFor ->
       window.response?

      runs ->
        resp = window.response
        console.log resp
        #expect(resp.code).toBe 200


  describe "execute delete operations", ->

    beforeEach ->
      window.body = null
      window.response = null
      window.success_callback = (data) ->
        window.response = data
      window.error_callback = (data) ->
        window.error = data
      window.operation = swagger.pet.operations.getPetById

    it "deletes an object", ->
      window.success_callback = (data) ->
        window.response = "successfully deleted pet"
      params = {}
      new SwaggerRequest("DELETE", "http://localhost:8002/api/pet/100", params, null, null, success_callback, error_callback, operation)

     waitsFor ->
       window.response?

      runs ->
        resp = window.response
        expect(resp).toBe("successfully deleted pet")

  describe "execute options call", ->

    beforeEach ->
      window.body = null
      window.response = null
      window.success_callback = (data) ->
        window.response = data
      window.error_callback = (data) ->
        window.error = data
      window.operation = swagger.pet.operations.getPetById

    it "gets options on the pet resource", ->
      window.success_callback = (data) ->
        window.response = "successfully fetched options"
      params = {}
      new SwaggerRequest("OPTIONS", "http://localhost:8002/api/pet", params, null, null, success_callback, error_callback, operation)

     waitsFor ->
       window.response?

      runs ->
        resp = window.response
        expect(resp).toBe("successfully fetched options")

  describe "execute patch call", ->

    beforeEach ->
      window.body = null
      window.response = null
      window.success_callback = (data) ->
        window.response = data
      window.error_callback = (data) ->
        window.error = data
      window.operation = swagger.pet.operations.getPetById

    it "merges an object", ->
      window.success_callback = (data) ->
        window.response = "successfully patched pet"
      params = {
        body: JSON.stringify({name: "ghoul"})
      }
      requestContentType = null
      responseContentType = "application/json"

      new SwaggerRequest("PATCH", "http://localhost:8002/api/pet/3", params, requestContentType, responseContentType, success_callback, error_callback, operation)

     waitsFor ->
       window.response?

      runs ->
        resp = window.response
        expect(resp).toBe("successfully patched pet")
  