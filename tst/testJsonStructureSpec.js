var chai = require('chai');
var expect = chai.expect;
var totalObjectKeys = require('./totalObjectKeys');
var jsonDiff = require('./jsondiff');
var expectedJSON = require('../expectedjson/barchart.json');
var expectedJSON1 = require('../expectedjson/linechart.json');
var actualJSON = require('../outputdata/barchart.json');
var actualJSON1 = require('../outputdata/linechart.json');

describe('Test Application as Blackbox', function(){
  it ('Test JSON is well formed', function(done){
    /*ToDO Parse JSON*/
    done();
  });
  it('JSON has expected Number of Objects', function(done){
    var objMatrix = totalObjectKeys.traverse(actualJSON);
    expect(objMatrix.totalNoObjects).to.not.equal(0);
    expect(objMatrix.totalNoKeys).to.not.equal(0);
    done();
  });
  it('Test JSON is as expected', function(done){
    var compareResult = jsonDiff.compareJSONObjects(expectedJSON, actualJSON);
    expect(compareResult.diffs).equal(0);
    done();
  });
  it('JSON has expected Number of Objects', function(done){
    var objMatrix1 = totalObjectKeys.traverse(actualJSON1);
    expect(objMatrix1.totalNoObjects).to.not.equal(0);
    expect(objMatrix1.totalNoKeys).to.not.equal(0);
    done();
  });
  it('Test JSON is as expected', function(done){
    var compareResult = jsonDiff.compareJSONObjects(expectedJSON1, actualJSON1);
    expect(compareResult.diffs).equal(0);
    done();
  });
})
