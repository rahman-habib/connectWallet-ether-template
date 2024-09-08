//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract HabiToken is ERC20,Ownable{
    address public _owner;
        uint256 public pricePerToken;

struct Request{
    address buyer;
    string email;
    uint256 timestamp;
    uint256 amount;
}
Request[] public AllBuyer;
    constructor()ERC20("HabiToken","HBT") Ownable(msg.sender){
        _owner=msg.sender;
        _mint(msg.sender, 2222 * 10 ** decimals() );
        pricePerToken=0.0000001 ether;
    }
function mint(address to ,uint256 value)public onlyOwner(){
    _mint(to, value);
        AllBuyer.push(Request(to,"Minted by owner",block.timestamp,value));

}

function buy(string memory _email , address _buyer,uint256 _amount)public payable{
    require(_amount>0,"Amount must be greater than zero");
    require(msg.value>=_amount*pricePerToken,"Insufficient payment");
    _mint(_buyer, _amount);
    AllBuyer.push(Request(_buyer,_email,block.timestamp,_amount));
    uint256 ownerShare=msg.value*50/100;
    payable(_owner).transfer(ownerShare);

}
function withdrawFunds()public onlyOwner(){
    payable(_owner).transfer(address(this).balance);
}
}