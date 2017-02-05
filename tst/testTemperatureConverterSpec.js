const should = require("chai").should(),
expect=require("chai").expect

convertToFahrenheit = require("../js/converters/TemperatureConverter");

describe("A series of test for TemperatureConverter", function(err){
  it("should calculate the rounded Fahrenheight from Celcius", function(done){
  	   var result=convertToFahrenheit(33);
       result.should.be.equal(91);
       done();
    });


  it("should only accept numerical value", function(done){
  	var result=convertToFahrenheit();
    expect(result).to.be.NaN;
    done();
    });

  });
