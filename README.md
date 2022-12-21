# nodejs-sdk-sandbox

A sample web app demonstrating the use of Kameleoon's [Node.JS SDK](https://developers.kameleoon.com/nodejs-sdk.html) for feature management and experimentation. Please check the [SDK documentation](https://developers.kameleoon.com/nodejs-sdk.html) for more details and this documentation (https://help.kameleoon.com/category/user-manual/activate-and-manage-your-feature-flags/) to know more about the features provided for Product and development teams.

Kameleoon Full Stack is a Feature Management and Experimentation solution for product and development teams. Learn more at https://kameleoon.com/en/platform/ab-testing-full-stack.

## Running the app locally on your device

Make sure you have [Node.js](http://nodejs.org/) installed on your device.

#### Clone the repo
```sh
$ git clone https://github.com/Kameleoon/nodejs-sdk-sandbox.git
$ cd nodejs-sdk-sandbox
$ npm install
```
Add your SDK credentials in client-nodejs.json. You can find your SDK credentials from app.kameleoon.com in the My profile header menu > See my credentials. Read this documentation (https://help.kameleoon.com/api-credentials/) for more details.

Add your domain and Kameleoon project sitecode in index.js. You can find your project sitecode from app.kameleoon.com in the Admin > Projects left menu. Read this documentation (https://help.kameleoon.com/question/how-do-i-find-my-site-id/) for more details.

#### Run the app to see how Kameleoon provides feature flag and experimentation capabilities:
```sh
$ npm start
```

#### Your app should now be running on localhost:5000 with these available endpoints:
- http://localhost:5000/feature/:id
This endpoint retrieves a feature flag data configuration (variation and feature variables)

- http://localhost:5000/experiment/:experimentId
This endpoint retrieves an experiment data configuration (variation and feature variables)

- http://localhost:5000/
This endpoint retrieves all experiments and feature flags running on your Kameleoon project

We have hosted the app on Heroku. You can play around with it [here](https://sdk-nodejs-sandbox.herokuapp.com/).