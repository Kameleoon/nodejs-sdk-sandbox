let {KameleoonClient, KameleoonData} = require("kameleoon-client-nodejs");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const path = require('path');

const domain = 'yourDomain'; // add your domain name
const siteCode = 'yourSiteCode'; // add your siteCode

const kameleoonClient = new KameleoonClient(siteCode, false, './client-nodejs.json');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    .get('/feature/:key', (req, res) => {
        const {key} = req.params;
        let visitorCode = kameleoonClient.getVisitorCode(req, res, domain);

        kameleoonClient.runWhenReady(async function () {
            const feature = {variables: null, variation: 0, variationData: {}, key};
            let error;

            try
            {
                feature.variation = kameleoonClient.getFeatureVariationKey(visitorCode, key);
                feature.variables = kameleoonClient.getFeatureAllVariables(key);
                Object.keys(feature.variables).forEach(variableName => {
                    feature.variationData[variableName] = kameleoonClient.getFeatureVariable(visitorCode, key, variableName);
                })
            }
            catch (e)
            {
                error = e;
                console.log(e)
            }

            return res.render('pages/index', {visitorCode, feature, error});
        }, function () {
            console.log("Timeout occured in the NodeJS SDK initialization.");
            return res.render('pages/index');
        }, 2000);

    })

    .get('/experiment/:experimentId', (req, res) => {
        const {experimentId} = req.params;
        let visitorCode = kameleoonClient.getVisitorCode(req, res, domain);

        kameleoonClient.runWhenReady(async function () {
            const experiment = {displayedVariation: 0, associatedData: null};
            let error;

            try
            {
                experiment.id = experimentId;
                experiment.displayedVariation = await kameleoonClient.triggerExperiment(visitorCode, experimentId);
                experiment.associatedData = experiment.displayedVariation ? kameleoonClient.getVariationAssociatedData(experiment.displayedVariation) : null;
            }
            catch (e)
            {
                error = e;
                console.log(e)
            }

            return res.render('pages/index', {visitorCode, experiment, error});
        }, function () {
            console.log("Timeout occured in the NodeJS SDK initialization.");
            return res.render('pages/index');
        }, 2000);

    })
    .get('/', (req, res) => {
      let visitorCode = kameleoonClient.getVisitorCode(req, res, domain);

      kameleoonClient.runWhenReady(async function () {
          let experimentList;
          let featureList;
          let error;
          try
          {
              experimentList = kameleoonClient.getExperimentList();
              featureList = kameleoonClient.getFeatureList();
          }
          catch (e){
              error = e;
              console.log(e)
          }

          return res.render('pages/index', {visitorCode, experimentList, featureList, error});
      }, function () {
        console.log("Timeout occured in the NodeJS SDK initialization.");
        return res.render('pages/index');
      }, 2000);

    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
