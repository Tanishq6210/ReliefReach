//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract Donation {
    struct Transaction{
        address from;
        string to;
        uint amt;
        uint time;
        string curr;
    }

    Transaction[] transactions;
    
    event newTransaction(address indexed from, string to, uint amt, uint timestamp, string curr);

    function makeTransaction(string memory add, uint amt, string memory currency) public {
        Transaction memory temp = Transaction(msg.sender, add, amt, block.timestamp, currency);
        transactions.push(temp);
        emit newTransaction(msg.sender, add, amt, block.timestamp, currency);
    }

    function getAllTransactions() public view returns(Transaction[] memory){
        return transactions;
    }
}