import React, { useState } from 'react';
import './Admin.css';
import { Database } from "@tableland/sdk";
import { providers } from "ethers";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

const provider = new providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);

const signer = provider.getSigner();
const db = new Database({ signer });

function Form() {
  const [inputValue, setInputValue] = useState("")
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
    color: "white",
  };

  async function createRecord () {
    const info = await db
    .prepare("INSERT INTO startups_11155111_74 (id, name, phone, description, address) VALUES (?1, ?2, ?3, ?4, ?5)")
    .bind(formData.id, formData.name, formData.phone, formData.description, formData.address)
    .run();
    console.log(info);
  }

  const mintPkpWithRelayer = async (credentialResponse) => {
    console.log("Minting PKP with relayer...");

    const mintRes = await fetch(`7ada413c-a3ab-4ec8-a183-e5c21ab0f284_ReliefReach/auth/google`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: credentialResponse.credential
      }),
    });

    if (mintRes.status < 200 || mintRes.status >= 400) {
      alert("Uh oh, something's not quite right.");
      return null;
    } else {
      const resBody = await mintRes.json();
      alert("Successfully initiated minting PKP with relayer.")
      return resBody.requestId;
    }
  }

  const pollRequestUntilTerminalState = async (requestId) => {
    if (!requestId) {
      return;
    }

    const maxPollCount = 20;
    for (let i = 0; i < maxPollCount; i++) {
      console.log(`Waiting for auth completion (poll #${i+1})`);
      const getAuthStatusRes = await fetch(`7ada413c-a3ab-4ec8-a183-e5c21ab0f284_ReliefReach/auth/status/${requestId}`);

      if (getAuthStatusRes.status < 200 || getAuthStatusRes.status >= 400) {
        console.log("Uh oh, something's not quite right.");
        return;
      }

      const resBody = await getAuthStatusRes.json();

      if (resBody.error) {
        // exit loop since error
        return;
      } else if (resBody.status === "Succeeded") {
        // exit loop since success
        console.log(resBody.pkpEthAddress);
        console.log(resBody.pkpPublicKey);
        setInputValue(resBody.pkpPublicKey)
        return;
      }

      // otherwise, sleep then continue polling
      await new Promise(r => setTimeout(r, 15000));
    }

    // at this point, polling ended and still no success, set failure status
    console.log(`Hmm this is taking longer than expected...`)
  }

  const LogIn = async (credentialResponse) => {
    console.log("Logged in to Google");
    // setGoogleCredentialResponse(credentialResponse);
    const requestId = await mintPkpWithRelayer(credentialResponse);
    await pollRequestUntilTerminalState(requestId);
  };

  
  return (
    <div>
      <GoogleLogin onSuccess={LogIn} onError={(error) => {console.log(error)}}/>

        <br></br>
        <br></br>
    <div className="form-container">
        <center><b><p style={myStyle}>Add New Relief Request</p></b></center>
        <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Relief Request no.</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Location </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number </label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">PKP</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <button type="submit">ADD REQUEST</button>
      </form>
      <div className="form-group">
        <br></br>
        <br></br>
          <label>Generated PKP</label>
          <br></br>
          <br></br>
          <input type="text" value = {inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </div>
    </div>
    </div>
  );
}

export default Form;