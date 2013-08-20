function Filter(gardenSet) {
  this.gardenSet = gardenSet
  this.set = gardenSet.set;
  this.demandCropFilter = [];
  this.supplyCropFilter = [];
}

Filter.prototype.bindEvents = function(){
  var self = this;
  $(this.gardenSet).on('gardenAdded', function(){
    self.filter();
  })
}

Filter.prototype.validateDemand = function(garden){
  return (garden.getDemandNames().diff(this.demandCropFilter)).length > 0
}

Filter.prototype.validateSupply = function(garden){
  return (garden.getSupplyNames().diff(this.supplyCropFilter)).length > 0
}

Filter.prototype.filter = function() {
  var self = this;
  $(this.set).each(function() {
    if (self.validateDemand(this) || self.validateSupply(this)) {
      $(this).trigger('shown');
    } else {
      $(this).trigger('hidden');
    }
  })
}

Filter.prototype.addDemand = function(crop_name){
  this.addFilter(crop_name, this.demandCropFilter);
}

Filter.prototype.removeDemand = function(crop_name){
  this.removeFilter(crop_name, this.demandCropFilter)
}

Filter.prototype.addSupply = function(crop_name){
  this.addFilter(crop_name, this.supplyCropFilter);
}

Filter.prototype.removeSupply = function(crop_name){
  this.removeFilter(crop_name, this.supplyCropFilter);
}

Filter.prototype.removeFilter = function(crop_name, collection) {
  if (collection.includes(crop_name)) {
    collection.exterminate(crop_name)
  }
}

Filter.prototype.addFilter = function(crop_name, collection) {
  if (!collection.includes(crop_name)) {
    collection.push(crop_name)
  } 
}