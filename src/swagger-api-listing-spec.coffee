window.api_key = 'special-key'

describe 'Swagger Api Listing', ->

  beforeEach ->
    window.swagger = new SwaggerApi({url: 'http://localhost:8002/api/api-docs/pet'})
    swagger.build()
    waitsFor ->
      swagger.ready?

  describe "execute get operations", ->

    beforeEach ->
      window.body = null
      window.response = null
      window.callback = null
      window.error = null
      window.success_callback = (data) ->
        window.response = data
      window.error_callback = (data) ->
        window.error = data

    it "verifies the http request object for a GET", ->
      params = {
        headers: {}
        petId: 1
      }
      opts = {
        mock: true
      }

      window.response = swagger.apis
      expect(swagger.apis.pet).toBeDefined

    it "verifies the response messages from the get operation with query params", ->
      swagger.pet.findPetsByStatus({status: "available"}, window.success_callback)

      waitsFor ->
        window.response?

      runs ->
        pet = JSON.parse(window.response.content.data)
        console.log(pet)
        expect(pet.code).toNotBe 400