import { useState, useEffect } from "react";
import {ethers} from "ethers";
import web3 from "web3"
import './Flexy.css'
const contractAddressScroll = "0xbBdb40ad55e20C307B29B2C178550aE8f41db1F5";
const contractAddressMantle = "0xfa5e95bdea02bC7BD3C7ba2F6705805975186aD2";

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

export default function Dashboard(){
  const [arr1, setVotes_array1] = useState([]);
  const [arr2, setVotes_array2] = useState([]);
  

  async function getAllTransactions() {
	if (window.ethereum.networkVersion !== 534351) {
		try {
			await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: web3.utils.toHex(534351) }]
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const sig = provider.getSigner();        
			const contract = new ethers.Contract(contractAddressScroll, abi, sig);
			const tx1 = await contract.getAllTransactions();
			setVotes_array1(tx1)
			console.log(tx1)
			
		} catch (err) {
			// This error code indicates that the chain has not been added to MetaMask
			// alert("Add Matle to Metamask!!")
		}
	}


	const chainId = 5001 // Mantle Testnet

	if (window.ethereum.networkVersion !== chainId) {
		try {
			await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: web3.utils.toHex(chainId) }]
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const sig = provider.getSigner();        
			const contract = new ethers.Contract(contractAddressMantle, abi, sig);
			const tx1 = await contract.getAllTransactions();
			setVotes_array2(tx1)
			console.log(tx1)
			
		} catch (err) {
			// This error code indicates that the chain has not been added to MetaMask
			// alert("Add Matle to Metamask!!")
		}
	}
  }
	useEffect(() => {
		getAllTransactions()
	  }, []);

  const myStyle = {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const tableRowStyle = {
    backgroundColor: '#176B87',
  };

  const tableRowStyle2 = {
	color: "white",
    backgroundColor: '#04364A',
  };

  const tableCellStyle = {
    padding: '10px',
	color: "white",
    borderBottom: '2px solid white',
    textAlign: 'center',
  };

  return (
    <div className="about">
        <br></br>
        <br></br>
        <center>
		<div className="flex-container1">
      	{
          arr1.map((obj, index) => (
          <div className="card" key={index}>
		  <p><b>CURRENCY SYMBOL: </b> {obj[4]}</p>
		  <p><b>DONATION TIME: </b> {obj[3].toNumber()}</p>
		  <p><b>DONATED AMOUNT:</b> {obj[2].toNumber()}</p>
          <p><b>SOURCE: </b> {obj[0]}</p>
          <p><b>DESTINATION: </b> {obj[1]}</p>
          </div>
     	 ))}</div>
		<div className="flex-container1">
      	{
          arr2.map((obj, index) => (
          <div className="card" key={index}>
		  <p><b>CURRENCY SYMBOL: </b> {obj[4]}</p>
		  <p><b>DONATION TIME: </b> {Math.floor(new Date(new Date(parseInt(obj[3]._hex,16)*1000).toLocaleDateString()).getTime() / 1000)}</p>
		  <p><b>DONATED AMOUNT:</b> {parseInt(obj[2]._hex, 16)}</p>
          <p><b>SOURCE: </b> {obj[0]}</p>
          <p><b>DESTINATION: </b> {obj[1]}</p>
          </div>
     	 ))}</div>
</center>
<br></br><br></br>
    </div>
);

}