const admin = require('firebase-admin');
const { Parser } = require('json2csv');
const fs = require('fs');

// Initialize Firebase Admin SDK
const serviceAccount = require('./Users/user/Desktop/Trustbarter/trustbarter-4763c-firebase-adminsdk-fbsvc-7d44549399.json');  // Add path to the service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to fetch data and convert it to CSV
async function fetchAndExportData() {
  try {
    const snapshot = await db.collection('formSubmissions').get();
    const submissions = [];
    
    snapshot.forEach(doc => {
      submissions.push(doc.data());
    });

    if (submissions.length === 0) {
      console.log('No data to export');
      return;
    }

    // Convert JSON data to CSV
    const csvParser = new Parser();
    const csvData = csvParser.parse(submissions);

    // Write CSV to file
    fs.writeFileSync('formSubmissions.csv', csvData);
    console.log('CSV file successfully created: formSubmissions.csv');
    
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

fetchAndExportData();

