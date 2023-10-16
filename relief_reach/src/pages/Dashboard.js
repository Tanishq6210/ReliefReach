import { useState, useEffect } from "react";
import {ethers} from "ethers";

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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const sig = provider.getSigner();        
    const contract = new ethers.Contract(contractAddressScroll, abi, sig);
    const tx1 = await contract.getAllTransactions();
    setVotes_array1(tx1)
    console.log(tx1)

	
  }

  async function getAllTransactionsMNT() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const sig = provider.getSigner();        
    const contract = new ethers.Contract(contractAddressMantle, abi, sig);
    const tx1 = await contract.getAllTransactions();
    setVotes_array2(tx1)
    console.log(tx1)
  }

  const myStyle = {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const tableRowStyle = {
    backgroundColor: '#A6BB8D',
  };

  const tableRowStyle2 = {
    backgroundColor: '#61876E',
  };

  const tableCellStyle = {
    padding: '10px',
    borderBottom: '2px solid white',
    textAlign: 'center',
  };

  return (
    <div className="about">
        <button onClick={getAllTransactions}>Get Scroll Transactions</button>
		<button onClick={getAllTransactionsMNT}>Get MNT Transaction</button>
        <br></br>
        <br></br>
        <center>
        <table className="table" style={myStyle}>
        <thead>
    <tr style={tableRowStyle2}>
        <th style={tableCellStyle}>FROM ADDRESS</th>
        <th style={tableCellStyle}>TO ADDRESS</th>
        <th style={tableCellStyle}>AMOUNT(in wei)</th>
        <th style={tableCellStyle}>TIME</th>
        <th style={tableCellStyle}>CURRENCY</th>
      </tr>
    </thead>
    <tbody>
      {
        arr1.map(
          (info, ind) => {
            return (
              <tr style={tableRowStyle}>
                <td style={tableCellStyle}>{info[0]}</td>
                <td style={tableCellStyle}>{info[1]}</td>
                <td style={tableCellStyle}>{info[2].toNumber()}</td>
                <td style={tableCellStyle}>{info[3].toNumber()}</td>
                <td style={tableCellStyle}>{info[4]}</td>
              </tr>
            )
          }
        )
      },
      {
        arr2.map(
          (info, ind) => {
            return (
              <tr style={tableRowStyle}>
                <td style={tableCellStyle}>{info[0]}</td>
				<td style={tableCellStyle}>{info[1]}</td>
                <td style={tableCellStyle}>{parseInt(info[2]._hex, 16)}</td>
                <td style={tableCellStyle}>{
					Math.floor(new Date(new Date(parseInt(info[3]._hex,16)*1000).toLocaleDateString()).getTime() / 1000)
				}</td>
                <td style={tableCellStyle}>{info[4]}</td>
              </tr>
            )
          }
        )
      }
    </tbody>
</table>
</center>
<br></br><br></br>
    </div>
);

}