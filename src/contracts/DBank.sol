// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15;

import "./DCBToken.sol";

contract DBank {
    DCBToken private token;

    mapping(address => uint256) public depositedEther;
    mapping(address => uint256) public depositedAt;
    mapping(address => bool) public isDeposited;
    mapping(address => uint256) public interestPaid;

    event Deposit(
        address indexed user,
        uint256 etherAmount,
        uint256 depositTime
    );

    event Withdraw(
        address indexed user,
        uint256 etherAmountPayed,
        uint256 interestPayed,
        uint256 withdrawalTime
    );

    event Transfer(
        address indexed user,
        address transferredTo,
        uint256 etherAmountTransfered,
        uint256 interestPayed,
        uint256 transferredAt
    );

    constructor(DCBToken _token) {
        token = _token;
    }

    function deposit() public payable {
        require(
            msg.value >= 1e16,
            "Error: Minimum deposit of 0.1 ETH is required."
        );

        uint256 depositedFor = block.timestamp - depositedAt[msg.sender];

        uint256 interestPerSecond = 31668017 *
            (depositedEther[msg.sender] / 1e16);
        uint256 interestToPay = interestPerSecond * depositedFor;

        token.mint(msg.sender, interestToPay);
        interestPaid[msg.sender] = interestPaid[msg.sender] + interestToPay;

        depositedEther[msg.sender] = depositedEther[msg.sender] + msg.value;
        depositedAt[msg.sender] = block.timestamp;
        isDeposited[msg.sender] = true;

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    function withdraw(uint256 amount) public {
        uint256 userBalance = depositedEther[msg.sender];

        require(isDeposited[msg.sender] == true, "Error: No previous deposit.");
        require(amount <= userBalance, "Error: Insufficient balance.");

        uint256 depositedFor = block.timestamp - depositedAt[msg.sender];

        uint256 interestPerSecond = 31668017 * (userBalance / 1e16);
        uint256 interestToPay = interestPerSecond * depositedFor;

        payable(msg.sender).transfer(amount);

        depositedEther[msg.sender] = userBalance - amount;
        if (depositedEther[msg.sender] == 0) {
            depositedAt[msg.sender] = 0;
        } else {
            depositedAt[msg.sender] = block.timestamp;
        }
        isDeposited[msg.sender] = depositedEther[msg.sender] != 0;

        token.mint(msg.sender, interestToPay);
        interestPaid[msg.sender] = interestPaid[msg.sender] + interestToPay;

        emit Withdraw(msg.sender, userBalance, interestToPay, block.timestamp);
    }

    function transferTo(address to, uint256 amount) public {
        require(
            depositedEther[msg.sender] > amount,
            "Error: Insufficient balance."
        );

        uint256 balanceBeforeTransfer = depositedEther[msg.sender];
        uint256 depositedFor = block.timestamp - depositedAt[msg.sender];

        uint256 interestPerSecond = 31668017 * (balanceBeforeTransfer / 1e16);
        uint256 interestToPay = interestPerSecond * depositedFor;

        payable(to).transfer(amount);
        token.mint(msg.sender, interestToPay);
        interestPaid[msg.sender] = interestPaid[msg.sender] + interestToPay;

        depositedEther[msg.sender] = depositedEther[msg.sender] - amount;
        depositedAt[msg.sender] = block.timestamp;
        isDeposited[msg.sender] = depositedEther[msg.sender] != 0;

        emit Transfer(msg.sender, to, amount, interestToPay, block.timestamp);
    }
}
