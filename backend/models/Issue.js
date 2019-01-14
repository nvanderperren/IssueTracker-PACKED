import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
  title: String,
  responsible: String,
  description: String,
  severity: String,
  status: {
    type: String, default: 'Open'
  }
});

export default mongoose.model('Issue', Issue);
