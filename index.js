let {KameleoonClient, KameleoonData} = require("kameleoon-client-nodejs");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const path = require('path');

const domain = 'yourdomain.com'; // add your domain name
const siteCode = 'yourSiteCode'; // add your siteCode

const kameleoonClient = new KameleoonClient(siteCode, false, './client-nodejs.json');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    .get('/feature/:id', (req, res) => {
        const {id} = req.params;
        let visitorCode = kameleoonClient.obtainVisitorCode(req, res, domain);

        kameleoonClient.runWhenReady(async function () {
            const feature = {isActive: 0, variables: null, variation: 0, variationData: {}};
            let error;

            try
            {
                feature.id = id;
                const FFName = kameleoonClient.configurations?.featureFlags[feature.id]?.identificationKey;
                feature.isActive = await kameleoonClient.activateFeature(visitorCode, id);
                feature.variation = kameleoonClient.getFeatureVariationKey(visitorCode, FFName);
                feature.variables = kameleoonClient.obtainFeatureAllVariables(id);
                Object.keys(feature.variables).forEach(variableName => {
                    feature.variationData[variableName] = kameleoonClient.getFeatureVariable(visitorCode, FFName, variableName);
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
        let visitorCode = kameleoonClient.obtainVisitorCode(req, res, domain);

        kameleoonClient.runWhenReady(async function () {
            const experiment = {displayedVariation: 0, associatedData: null};
            let error;

            try
            {
                experiment.id = experimentId;
                experiment.displayedVariation = await kameleoonClient.triggerExperiment(visitorCode, experimentId);
                experiment.associatedData = experiment.displayedVariation ? kameleoonClient.obtainVariationAssociatedData(experiment.displayedVariation) : null;
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
      let visitorCode = kameleoonClient.obtainVisitorCode(req, res, domain);

      kameleoonClient.runWhenReady(async function () {
          let experimentList;
          let featureList;
          let error;
          try
          {
              experimentList = KameleoonClient.obtainExperimentList();
              featureList = kameleoonClient.obtainFeatureList();
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
