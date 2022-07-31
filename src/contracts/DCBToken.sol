// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DCBToken is ERC20 {
    address public minter;

    // This event fires when the changeMinter function is called, and it can be listened on to from the frontend.
    event MinterChanged(address indexed from, address to);

    constructor() payable ERC20("Decentralized Bank Currency", "DBC") {
        minter = msg.sender;
    }

    function changeMinter(address dBank) public returns (bool) {
        require(
            msg.sender == minter,
            "Error: Only the owner can change minter role."
        );
        minter = dBank;

        emit MinterChanged(msg.sender, dBank);
        return true;
    }

    function mint(address account, uint256 amount) public {
        require(
            msg.sender == minter,
            "Error: msg.sender doesn't have the minter role."
        );

        _mint(account, amount);
    }
}
