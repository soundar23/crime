var log4js = require('log4js');
var logger = log4js.getLogger();
module.exports = ((principal, months, rate) => {
   let intr   = rate / 1200;
   let monthlyPayment = principal * intr / (1 - (Math.pow(1/(1 + intr), months)));
   logger.debug(monthlyPayment);
   return Number((monthlyPayment).toFixed(2));
});
