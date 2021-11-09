// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface cETH {
    // define functions of compound we will use here
    function mint() external payable; // to deposit compound
    function redeem() external returns (uint); // to withdraw from compound

    // following two function to determine how much you will withdraw
    function exchangeRateStored() external view returns (uint);
    function balanceOf(address owner) external view returns (uint256 balance); 
}

contract SmartBankAccount {
    cETH ceth;
    uint totalContractBalance = 0;
    
    mapping(address => uint) balances;
    mapping(address => uint) depositTimestamps;

    constructor() {
        ceth = cETH(0x859e9d8a4edadfedb5a2ff311243af80f85a91b8);
    }

    function getContractBalance() public returns(uint){
        return totalContractBalance;
    }
    
    function addBalance() public payable {
        balances[msg.sender] = msg.value;
        totalContractBalance = totalContractBalance + msg.value;
        depositTimestamps[msg.sender] = block.timestamp;
        // send eth to compound
        ceth.mint{value: msg.sender}();
    }
    
    function getBalance(address userAddress) public returns(uint){
        // uint principal = balances[userAddress];
        // uint timeElapsed = block.timestamp - depositTimestamps[userAddress]; //seconds
        // return principal + uint(principal * (7 * timeElapsed / (100 * 365 * 24 * 60 * 60))) + 1; //simple interest of 0.07%  per year
        
        // now using compound
        return ceth.balanceOf(userAddress) * ceth.exchangeRateStored() / 1e18;
    }
    
    function withdraw() public payable {
        address payable withdrawTo = payable(msg.sender);
        uint amountToTransfer = getBalance(msg.sender);
        withdrawTo.transfer(amountToTransfer);
        totalContractBalance = totalContractBalance - amountToTransfer;
        balances[msg.sender] = 0;
    }
    
}
