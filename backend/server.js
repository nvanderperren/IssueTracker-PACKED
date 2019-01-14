import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './models/Issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/issues', {useNewUrlParser: true});
const connection = mongoose.connection;
mongoose.set('useFindAndModify', false);

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

router.route('/issues').get((req, res) => {
  Issue.find((err, issues) => {
    if (err)
      console.log(err);
    else
      res.json(issues);
  });
});

router.route('/issues/:id').get((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err)
      console.log(err)
    res.json(issue);
  });
});

router.route('/issues/add').post((req, res) => {
  let issue = new Issue(req.body);
  issue.save().then(issue => {
    res.status(200).json({ 'issue': 'Added successfully ' + issue.title });
  })
    .catch(err => {
      res.status(400).send('Failed to create new record');
    });
});

router.route('/issues/update/:id').put((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (!issue)
      return next(new Error('Could not load document'));
    issue.title = req.body.title;
    issue.responsible = req.body.responsible;
    issue.description = req.body.description;
    issue.severity = req.body.severity;
    issue.status = req.body.status

    issue.save().then(issue => {
      res.json('Update done of ' + issue.title);
    }).catch(err => {
      res.status(400).send('Update failed');
    });
  });
});

router.route('/issues/delete/:id').delete((req, res) => {
  Issue.findOneAndRemove({ _id: req.params.id }, (err, issue) => {
    if (err)
      res.json(err);
    res.json('Removed successfully');
  });
});

app.use('/', router);
app.listen(4000, () => console.log('Express server running on port 4000'));
