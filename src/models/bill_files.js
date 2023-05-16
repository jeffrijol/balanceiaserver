const mongoose = require('mongoose');


const billFilesSchema = mongoose.Schema( {
  bill: {
    type: String
  },
  branch: {
    type: String
  },
  client: {
    type: String
  },
  pdf_file: {
    type: Buffer 
  },
  xml_file: {
    type: Buffer
  }
});

module.exports = mongoose.model('bill_files', billFilesSchema);