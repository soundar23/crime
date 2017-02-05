const log4js = require('log4js');
const logger = log4js.getLogger();
const should = require("chai").should(),
expect = require("chai").expect,
assert = require ("chai").assert,
calculateInterest = require("../js/InterestCalculator");

describe("A series of text for InterestCalculator", function(err){
  it("should calculate the monthly interest", function(done){
  	   var result=calculateInterest(100000,12,10); 
       assert.equal(result,  8791.59);  
       result.should.be.equal(8791.59);  
       done();
    });
  it("should only accept numerical value", function(done){
  	var result=calculateInterest();
    expect(result).to.be.NaN;
    done();
     
    });
  });
