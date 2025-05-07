// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

contract Transaction{
    uint256 transactionCounter;
    // address payable public receiver = payable(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199); //19
    

    event Transfer(address indexed  from, address indexed  receiver, uint amount, string message, uint256 timestamp);

    struct Fund {
        string  name;
        address payable recipient;
    }    

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    Fund[] public funds;
    TransferStruct[] public transactions;

    constructor() {
        funds.push(Fund("SaigonCCO", payable(0xBcd4042DE499D14e55001CcbB24a551F3b954096))); //10
        funds.push(Fund("LCF",    payable(0x71bE63f3384f5fb98995898A86B02Fb2426c5788))); //11
        funds.push(Fund("LCHH", payable(0xFABB0ac9d68B0B445fB7357272Ff202C5651694a))); //12
    }

    

    function donateToFund(uint256 index) external payable {
        require(index < funds.length, "Invalid fund index");
        require(msg.value > 0, "Donation must be greater than 0");

        address payable to = funds[index].recipient;
        (bool ok, ) = to.call{ value: msg.value }("");
        require(ok, "Transfer failed");
    }

    function donateToFund(
        uint256 fundId,
        uint256 amount,
        string memory message
    ) public payable {
        require(msg.value == amount, "Transferred amount must match the value");
        require(fundId < funds.length, "Invalid fund selected");

        address payable recipient = funds[fundId].recipient;

        transactionCounter += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                recipient,
                amount,
                message,
                block.timestamp
            )
        );

        (bool sent, ) = recipient.call{ value: amount }("");
        require(sent, "Transfer to fund failed");

        emit Transfer(msg.sender, recipient, amount, message, block.timestamp);
    }

    function getTransactionCount() public view returns (uint) {
        return transactionCounter;
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getFundCount() external view returns (uint256) {
        return funds.length;
    }

    function getFund(uint256 index) external view returns (string memory, address) {
        require(index < funds.length, "Invalid index");
        Fund storage f = funds[index];
        return (f.name, f.recipient);
    }

    //Test Function
    function resetTransactions() public {
        delete transactions;
        transactionCounter = 0;
    }


}