const appModel = require('../models/apps.model');

// LIST method
const listApplications = async (req, res) => {
    try {
        let query = {};
        if (req.body.platform) {
            query.platform = req.body.platform;
        }
        if (req.body.choice) {
            query.choice = req.body.choice;
        }
        if (req.body.exclusive) {
            query.exclusive = req.body.exclusive === true;
        }
        const apps = await appModel.find(query).sort({ appId: 1 }).select('-_id -__v');
        const appCount = apps.length;
        res.status(200).send({ appCount: appCount, appData: apps });
    } catch (error) {
        console.error('Error listing applications:', error);
        res.status(500).send('Unable to list applications');
    }
};

// CREATE method
const createApplication = async (req, res) => {
    try {
      const maxApp = await appModel.findOne().sort({appId: -1}).exec();
      const newApp = new appModel({
        ...req.body,
        appId: maxApp ? maxApp.appId + 1 : 1
      });
      const savedApp = await newApp.save();
      res.status(200).send({ message: 'Application added successfully', appData: savedApp });
    } catch (error) {
      console.error('Error adding application:', error);
      res.status(500).send({ message: 'Unable to add application' });
    }
  };

// UPDATE method
const updateApplication = async (req, res) => {
    try {
      const updatedApp = await appModel.findOneAndUpdate(
        { appId: req.body.appId },
        { $set: req.body.appData[0] },
        { new: true }
      ).select('-_id -__v');
      if (!updatedApp) {
        res.status(404).send({ error: 'Application not found' });
      } else {
        res.status(200).send(updatedApp);
      }
    } catch (error) {
      console.error('Error updating application:', error);
      res.status(500).send({ error: 'Unable to update application' });
    }
};


// VIEW method
const viewApplication = async (req, res) => {
    try {
        const app = await appModel.findOne({ appId: req.body.appId }).select('-_id -__v');
        if (!app) {
            throw new Error('Application not found');
        }
        res.status(200).send({ data: app });
    } catch (error) {
        console.error('Error listing applications:', error);
        res.status(500).send('Unable to list applications');
    }
};

// DELETE method
const deleteApplication = async (req, res) => {
    try {
        const deletedApp = await appModel.findOneAndDelete({ appId: req.body.appId }).select('-_id -__v');
        if (!deletedApp) {
            throw new Error('Application not found');
        }
        res.status(200).send({ status: true, message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).send('Unable to list applications');
    }
};

module.exports = { createApplication, updateApplication, listApplications, viewApplication, deleteApplication };