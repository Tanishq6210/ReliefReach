import React, { useState } from 'react';
import './Admin.css';
import { Database } from "@tableland/sdk";
import { providers } from "ethers";

// import {
//   LitAuthClient,
//   StytchOtpProvider,
// } from "@lit-protocol/lit-auth-client/src/index.js";
// import prompts from "prompts";
// import * as stytch from "stytch";
// import { LitNodeClientNodeJs } from "@lit-protocol/lit-node-client-nodejs";
// import { ProviderType } from "@lit-protocol/constants";


// // Connect to provider from browser and get accounts
const provider = new providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);

// Pass the signer to the Database
const signer = provider.getSigner();
const db = new Database({ signer });

//Add in dotenv
// const STYTCH_PROJECT_ID = process.env.STYTCH_PROJECT_ID;
// const STYTCH_SECRET = process.env.STYTCH_SECRET;
// const LIT_RELAY_API_KEY = process.env.LIT_RELAY_API_KEY;

// if (!STYTCH_PROJECT_ID || !STYTCH_SECRET) {
//   throw Error("Could not find stytch project secret or id in enviorment");
// }

// if (process.argv.length < 3) {
//   throw Error("Please provide either --lookup or --claim flag");
// }

// const client = new stytch.Client({
//   project_id: STYTCH_PROJECT_ID,
//   secret: STYTCH_SECRET,
// });


// //Lit-Protocol
// const stytchClient = new stytch.Client({
//   project_id: STYTCH_PROJECT_ID,
//   secret: STYTCH_SECRET,
// });

function Form() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    description: '',
    address: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    createRecord();

    setFormData({
      id: '',
      name: '',
      phone: '',
      description: '',
      address: ''
    });
    alert("Added Successfully!")
  }

  const myStyle = {
    textAlign: 'center',
    fontSize : '30px',
    color : "#3C6255",
  };

  async function createRecord () {
    const info = await db
    .prepare("INSERT INTO startups_11155111_74 (id, name, phone, description, address) VALUES (?1, ?2, ?3, ?4, ?5)")
    .bind(formData.id, formData.name, formData.phone, formData.description, formData.address)
    .run();
    console.log(info);
  }

  // async function getLitPublicKey() {
  //   const emailResponse = await prompts({
  //     type: "text",
  //     name: "email",
  //     message: "Enter your email:",
  //   });
    
  //   const stytchResponse = await client.otps.email.loginOrCreate({
  //     email: emailResponse.email,
  //   });
    
  //   const otpResponse = await prompts({
  //     type: "text",
  //     name: "code",
  //     message: "Enter the code sent to your email:",
  //   });
    
  //   const authResponse = await client.otps.authenticate({
  //     method_id: stytchResponse.email_id,
  //     code: otpResponse.code,
  //     session_duration_minutes: 60 * 24 * 7,
  //   });
    
  //   let sessionResp = await client.sessions.get({
  //     user_id: authResponse.user_id,
  //   });
    
  //   const sessionStatus = await client.sessions.authenticate({
  //     session_token: authResponse.session_token,
  //   });
    
  //   const litNodeClient = new LitNodeClientNodeJs({
  //     litNetwork: "cayenne",
  //     debug: false,
  //   });
    
  //   await litNodeClient.connect();
    
  //   const authClient = new LitAuthClient({
  //     litRelayConfig: {
  //       relayApiKey: LIT_RELAY_API_KEY,
  //     },
  //     litNodeClient,
  //   });
    
  //   const session = authClient.initProvider<StytchOtpProvider>(
  //     ProviderType.StytchOtp,
  //     {
  //       userId: sessionStatus.session.user_id,
  //       appId: STYTCH_PROJECT_ID,
  //     }
  //   );
    
  //   const authMethod = await session.authenticate({
  //     accessToken: sessionStatus.session_jwt,
  //   });
  //   const publicKey = await session.computePublicKeyFromAuthMethod(authMethod);
  //   console.log("local public key computed: ", publicKey);
    
  //   if (process.argv.length >= 3 && process.argv[2] === "--claim") {
  //     let claimResp = await session.claimKeyId({
  //       authMethod,
  //     });
  //     console.log("claim response public key: ", claimResp.pubkey);
  //   } else if (process.argv.length >= 3 && process.argv[2] === "--lookup") {
  //     const pkpInfo = await session.fetchPKPsThroughRelayer(authMethod);
  //     console.log(pkpInfo);
  //   }
  // }

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
    <div className="form-container">
        <center><b><p style={myStyle}>Add New Relief Request</p></b></center>
        <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Location</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Public Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Form;