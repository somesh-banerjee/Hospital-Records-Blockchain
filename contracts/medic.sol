// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;

contract superadmin{
    address admin;
    mapping(address => bool) public hosAdmin;
    
    struct Patient{
        string name;
        string aadhar;
        string dob;
        string sex;
        bytes32[] docs;
    }
    mapping(address => Patient) public patients;
    address[] patList;
    
    struct Hospital{
        string name;
    }
    mapping(address => Hospital) public hospitals;
    
    modifier restricted() {
        require(msg.sender == admin);
        _;
    }
    
    function newHospital(string memory n,address u) public restricted{
        hospitals[u].name = n;
        hosAdmin[u]=true;
    }
    
    function newPatient(string memory n,string memory a, string memory d, string memory s) public{
        patients[msg.sender].name=n;
        patients[msg.sender].aadhar=a;
        patients[msg.sender].dob = d;
        patients[msg.sender].sex = s;
        patList.push(msg.sender);
    }
    
    /*function upDoc(bytes32 hash) public{
        require(hosAdmin[msg.sender]);
    }*/
    
    function getPatients() public view returns (address[] memory) {
        return patList;
    }
}