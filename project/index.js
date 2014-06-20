function Stock(config) {
  'use strict';
  if(!config) {
    throw Error("Invalid config init");
  }
  if(!config.name)
  if(!config.marketValue || !config.totalShares) {
    throw Error("Invalid config init");
  }
  var marketValue = config.marketValue;
  var totalShares = config.totalShares;
  var curPrice = marketValue / totalShares;
  return {
    getPrice: function() {
      return curPrice;
    },
    setPrice: function(p) {
      curPrice = p;
      marketValue = p * totalShares;
    }
  }
}