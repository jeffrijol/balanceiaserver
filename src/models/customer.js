const mongoose = require('mongoose');


const customerSchema = mongoose.Schema( {
  name: {
    type: String
  },
  code: {
    type: String
  },
  user_list: [{
      email: {
          type : String,
          required : true
      }
  }] ,
  branch_list: [{
    name: {
        type : String,
        required : true
    }
}] 
});

module.exports = mongoose.model('customer', customerSchema);