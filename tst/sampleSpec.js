const should = require("chai").should(),
expect=require("chai").expect

combinationString = require("../js/converters/sample");

describe("A series of test cases to find out string combinations", function(err){
  it("should find out all the possible combinations of a string with same length", function(done){
    var result=combinationString("xyz");
    result.should.be.equal("xyz\nxzy\nyxz\nyzx\nzxy\nzyx");
    done();
  });

  it("should only accept numerical value", function(done){
  	var result=combinationString();
    expect(result).to.be.null;
    done();
  });

});
