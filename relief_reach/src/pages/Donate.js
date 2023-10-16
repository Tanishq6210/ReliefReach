import { useState, useEffect } from "react";
import { Database } from "@tableland/sdk";
import { ethers } from "ethers"

const tableName = "startups_11155111_74"; 

const db = new Database();
const { results } = await db.prepare("SELECT * FROM disasters_11155111_74;").all();

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "add",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "currency",
				"type": "string"
			}
		],
		"name": "makeTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "to",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "curr",
				"type": "string"
			}
		],
		"name": "newTransaction",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllTransactions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "to",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "curr",
						"type": "string"
					}
				],
				"internalType": "struct Donation.Transaction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractAddressScroll = "0xbBdb40ad55e20C307B29B2C178550aE8f41db1F5";
const contractAddressMantle = "0xfa5e95bdea02bC7BD3C7ba2F6705805975186aD2";

export default function Donate(){
  const [selectedValue, setSelectedValue] = useState('');
  const [amt, setAmt] = useState();
  const [data, setData] = useState([{
    id: '',
    name: '',
    phone: '',
    description: '',
    address: ''
  }]);

  useEffect(() => {
    setData(results)
    console.log(data)
  }, []);

  const myStyle = {
    fontSize: '20px',
    color: "#3C6255",
    fontStyle : "italic",
  };

  const myStyleBox = {
    width: '300px',
    height: '40px',
    borderRadius: '5px',
    border: '1px solid #345449',
    padding: '5px',
    fontSize: '16px',
    marginLeft : '.9rem',
  };

  const myStyle2 = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1000px',
    height: '100px',
    borderRadius: '5px',
    padding: '20px',
    fontSize : '20px',
  };

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleButtonClick = () => {
    alert('Selected value: ' + selectedValue);
  };

  function donateNGO(address) {
    donate(address)
  } 

  async function donate(address) {
    console.log(address.toString())
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();

     const contract1 = new ethers.Contract(contractAddressScroll, abi, signer);
     const contract2 = new ethers.Contract(contractAddressMantle, abi, signer);

     const addressToValue = address;
     const ETHAmountValue = amt;
     console.log(addressToValue + " " + ETHAmountValue);
    
     const weiAmountValue = ethers.utils.parseEther(ETHAmountValue)

     const transactionRequest = {
       to: addressToValue.toString(),
       value: weiAmountValue.toString()
     }

     const receipt = await signer.sendTransaction(transactionRequest);
     console.log(receipt);

    if(selectedValue == "scroll") {
      const eth = "ETH";
      console.log("scroll transaction")
       const tx = await contract1.makeTransaction(addressToValue, weiAmountValue, eth);
       console.log(tx) 
    } else {
      const mnt = "MNT";
      console.log("mantle transaction")
      const tx = await contract2.makeTransaction(addressToValue, weiAmountValue, mnt);
      console.log(tx) 
    }
  
     alert("You have donated " + ETHAmountValue + " ETH to " + addressToValue + " wei !")
 }

  const handleChange = event => {
    setAmt(event.target.value);

    console.log('value is:', event.target.value);
    };
    return (
      <div className="about">
      <br></br>
      <center>
        <p style={myStyle}>"Make a difference in someone's life by donating to NGOs. Your support can provide food, education, and medical aid to those in need.<br></br> Join us in creating a better world, one donation at a time."</p>
        <br></br>
      <div style={myStyle2}>
      <p style={myStyle}>Enter amount you wish to donate:</p> 
      
      <input type="text" style={myStyleBox} onChange={handleChange} value={amt} placeholder="Enter your amount in ETH" autoComplete="off"></input>

        <div>
        <select value={selectedValue} onChange={handleDropdownChange}>
          <option value="">Select an option</option>
          <option value="scroll">Scroll Sepolia Testnet</option>
          <option value="mantle">Mantle Testnet</option>
          
        </select>
        <button onClick={handleButtonClick}>Get Selected Value</button>
      </div>
      </div>
      </center>
      <center>
      <div className="flex-container">
      {results.map((obj, index) => (
          <div className="card" key={index}>
          <p id="title_para">{obj.id}</p>
          <p><b>Description:</b> {obj.description}</p>
          <p><b>ID:</b> {obj.id}</p>
          <p><b>Phone:</b> {obj.phone}</p> <br></br>
          <p><b>NGO Wallet Address:</b> {obj.address}</p>
          <center><button onClick={() => donateNGO(obj.address)}>Donate Now</button> </center>
          </div>
      ))}
      </div>
      </center>
  </div>
    );

}