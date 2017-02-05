var log4js = require('log4js');
var logger = log4js.getLogger();
module.exports=(x)=>{
  x=parseInt(x);
  return parseInt(((x*9)/5)+32);
}
