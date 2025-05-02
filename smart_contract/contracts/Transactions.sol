// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

contract Transaction{
    uint256 transactionCounter;
    address payable public receiver = payable(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199);

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    function addToBlockchain(uint amount, string memory message) public payable {
        require(msg.value == amount, "Transferred amount must match the value");
        transactionCounter += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp));

        (bool sent, ) = receiver.call{value: amount}("");
        require(sent, "Transfer to receiver failed");

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    function getTransactionCount() public view returns (uint) {
        return transactionCounter;
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    //Test Function
    function resetTransactions() public {
        delete transactions;
        transactionCounter = 0;
    }
}