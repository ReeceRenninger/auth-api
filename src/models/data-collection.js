'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ where: { id } });
    }
    else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }
  //** trying to convert this to use async */
  //** refer to lecture video to see Ryan */
  // async update  (id, data){
  //   let result = await this.model.findOne({ where: { id } });
  //   let modifiedDAta = await result.update(data);
  //   return modifiedDAta;
  // }
  update(id, data) {
    return this.model.findOne({ where: { id } })
      .then(record => record.update(data));
  }

  delete(id) {
    return this.model.destroy({ where: { id }});
  }

}

module.exports = DataCollection;