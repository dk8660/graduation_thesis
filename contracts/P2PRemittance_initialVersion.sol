// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract P2PRemittance {
    mapping(address => uint256) private balances;

    event Deposited(address indexed sender, uint256 amount);
    event Transferred(address indexed from, address indexed to, uint256 amount);

    // 입금 (Deposit)
        function deposit() external payable {
            require(msg.value > 0, "Deposit amount must be greater than 0");
            balances[msg.sender] += msg.value;

            emit Deposited(msg.sender, msg.value);
        }

    // 잔액 조회 (Check Balance)
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    // 송금 (Transfer)
    function transfer(address recipient, uint256 amount) external {
        require(recipient != address(0), "Invalid recipient address");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;

        emit Transferred(msg.sender, recipient, amount);
    }
}
