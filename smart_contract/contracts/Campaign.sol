// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Campaign {
    address public immutable owner;
    string  public title;
    string  public description;
    uint256 public target;
    uint256 public deadline;
    string  public image;
    uint256 public createdAt;

    struct BlockInfo {
        uint256 index;
        address donor;
        uint256 amount;
        uint256 timestamp;
        bytes32 prevHash;
        string  message;
    }

    mapping(uint256 => BlockInfo) private _blocks;
    uint256 public lastIndex;
    uint256 public totalCollected;
    bool public genBlockDone;
    bool public claimed;

    event DonationBlock(
        uint256 indexed index,
        address indexed donor,
        uint256 amount,
        string message
    );

    constructor(
        address _owner,
        string memory _title,
        string memory _desc,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) {
        require(_deadline > block.timestamp, "Deadline in past");

        owner = _owner;
        title = _title;
        description = _desc;
        target = _target;
        deadline = _deadline;
        image = _image;
        createdAt = block.timestamp;
    }

    function genBlock() external payable {
        require(!genBlockDone, "Genesis exists");
        require(msg.value > 0, "Need stake");

        _blocks[0] = BlockInfo({
            index: 0,
            donor: owner,
            amount: msg.value,
            timestamp: block.timestamp,
            prevHash: bytes32(0),
            message: "Genesis Donation"
        });

        lastIndex = 0;
        genBlockDone = true;
        totalCollected = msg.value;

        emit DonationBlock(0, owner, msg.value, "Genesis Transaction");
    }

    function getBlock(uint256 i) external view returns (BlockInfo memory) {
        return _blocks[i];
    }

    function donate(string calldata _message) external payable {
        require(genBlockDone, "Genesis first");
        require(msg.value > 0, "Zero donation");
        require(block.timestamp < deadline, "Campaign ended");
        require(!claimed, "Already claimed");

        ++lastIndex;
        _blocks[lastIndex] = BlockInfo({
            index: lastIndex,
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            prevHash: keccak256(
                abi.encode(
                    _blocks[lastIndex - 1].index,
                    _blocks[lastIndex - 1].donor,
                    _blocks[lastIndex - 1].amount,
                    _blocks[lastIndex - 1].timestamp,
                    _blocks[lastIndex - 1].message
                )
            ),
            message: _message
        });

        totalCollected += msg.value;
        emit DonationBlock(lastIndex, msg.sender, msg.value, _message);
    }

    function withdraw() external {
        require(msg.sender == owner, "Not owner");
        require(!claimed, "Already claimed");
        require(address(this).balance >= target, "Target not reached");

        claimed        = true;
        totalCollected = address(this).balance;

        ++lastIndex;
        _blocks[lastIndex] = BlockInfo({
            index: lastIndex,
            donor: owner,
            amount: address(this).balance,
            timestamp: block.timestamp,
            prevHash: keccak256(
                abi.encode(
                    _blocks[lastIndex - 1].index,
                    _blocks[lastIndex - 1].donor,
                    _blocks[lastIndex - 1].amount,
                    _blocks[lastIndex - 1].timestamp,
                    _blocks[lastIndex - 1].message
                )
            ),
            message: "Withdraw"
        });

        (bool ok, ) = payable(owner).call{value: address(this).balance}("");
        require(ok, "Transfer failed");
        emit DonationBlock(lastIndex, owner, _blocks[lastIndex].amount, "Withdraw");
    }
}
