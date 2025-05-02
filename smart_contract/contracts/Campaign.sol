// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Campaign {
    address public immutable owner;
    string  public title;
    string  public description;
    uint256 public target;
    uint256 public deadline;
    string  public image;

    struct Block {
        uint256 index;
        address donor;
        uint256 amount;
        uint256 timestamp;
        bytes32 prevHash;
    }

    mapping(uint256 => Block) public blocks;
    uint256 public lastIndex;
    bool    public claimed;

    event DonationBlock(uint256 indexed index, address indexed donor, uint256 amount);

    constructor(
        address _owner,
        string memory _title,
        string memory _desc,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) payable {
        require(_deadline > block.timestamp, "Deadline in past");

         owner       = _owner;
         title       = _title;
         description = _desc;
         target      = _target;
         deadline    = _deadline;
         image       = _image;

        blocks[0] = Block({
            index:      0,
            donor:      _owner,
            amount:     msg.value,
            timestamp:  block.timestamp,
            prevHash:   bytes32(0)
        });
        lastIndex = 0;
    }

    function donate() external payable {
        require(msg.value > 0, "Zero donation");
        require(block.timestamp < deadline, "Campaign ended");

        uint256 newIdx = ++lastIndex;

        blocks[newIdx] = Block({
            index:      newIdx,
            donor:      msg.sender,
            amount:     msg.value,
            timestamp:  block.timestamp,
            prevHash:   keccak256(
                            abi.encode(
                                blocks[newIdx - 1].index,
                                blocks[newIdx - 1].donor,
                                blocks[newIdx - 1].amount,
                                blocks[newIdx - 1].timestamp
                            )
                         )
        });

        emit DonationBlock(newIdx, msg.sender, msg.value);
    }

    function withdraw() external {
        require(msg.sender == owner, "Not owner");
        require(!claimed, "Already claimed");
        require(block.timestamp < deadline, "Deadline passed");
        require(address(this).balance >= target, "Target not reached");

        claimed = true;
        (bool ok, ) = payable(owner).call{value: address(this).balance}("");
        require(ok, "Transfer failed");
    }

    function amountCollected() external view returns (uint256) {
        return address(this).balance;
    }
}