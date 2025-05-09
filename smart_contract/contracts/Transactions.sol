// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Transaction {
    uint256 public transactionCounter;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] public transactions;

    function donateToFund(
        address payable to,
        string calldata message
    ) external payable {
        require(msg.value > 0, "Must send ETH");

        transactionCounter += 1;
        transactions.push(TransferStruct({
            sender: msg.sender,
            receiver: to,
            amount: msg.value,
            message: message,
            timestamp: block.timestamp
        }));

        (bool sent, ) = to.call{ value: msg.value }("");
        require(sent, "Transfer failed");

        emit Transfer(msg.sender, to, msg.value, message, block.timestamp);
    }

    function getAllTransactions() external view returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() external view returns (uint256) {
        return transactionCounter;
    }

    function resetTransactions() external {
        delete transactions;
        transactionCounter = 0;
    }
}
