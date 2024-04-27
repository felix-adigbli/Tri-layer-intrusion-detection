import { MongoClient } from 'mongodb';
import axios from 'axios';
import nodemailer from "nodemailer";


// Connection URI
const uri = 'mongodb://localhost:27017';
// Database Name
const dbName = 'CNN-LSTM-FUSION';

// Collection Name
const collectionName = 'attacks';
const logCollectionName = 'attacklog'
const apiEndpoint = 'http://localhost:8050/predict';





export const attackaction = async (ip, attacktype) => {
    try {
        // Find all records in the collection
        const records = await searchDoc(collectionName);

        //for each record, create a request and make an API call
        for (const record of records) {
          const featureRequest = convertRecordToFeature(record);
          const modelRequest = await axios.post(apiEndpoint, featureRequest);
          console.log(modelRequest.data);
          let severity;
          switch (modelRequest.data.attack_type) {
            case 'zeroday':
              severity = 'critical';
            break;
            case 'known':
              severity = 'high';
            break;
            case 'NA':
              severity = 'normal';
          break;
          default:
            severity = 'unknown';
          }

          const datetime = new Date().toISOString()
  
          const log = {
            targetIP: ip,
            dateTime: datetime,
            severity: severity ,
            class: modelRequest.data.class,
            classification: modelRequest.data.classification,
            clasificationType: modelRequest.data.attack_type
          }
          await writeToMongoDB(log);
          const mailOption = {

          }
         // if (modelRequest.data.attack_type === 'zeroday'){
          //  const sendmail = transporter.sendMail(mailOption);
          //  console.log('message sent:', sendmail.messageId)
         // }
          
        
        }  
        
    } catch (error) {
        console.error('Error:', error);
    }
};



//seach for records in collection

export const searchDoc = async (collectionName) => {
  //create new mongo client
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
     await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find({}).toArray();
    return result;
  } catch (error) {
    console.error('Error counting documents:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

//function to write to db
const writeToMongoDB = async (data) => {
    const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

    try {
        // Connect to the MongoDB database
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(logCollectionName);
        // Insert the data into the collection
        const result = await collection.insertOne(data);
        console.log('Data inserted:', result.insertedId);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
};


//function to convert each record to features
const convertRecordToFeature = (record) => {
    // Destructure the _id property and keep the rest of the properties
    const { _id, ...features } = record;
    return { features: [features] };
}


//send mail service


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "****@gmail.com",
    pass: "*****",
  },
});


