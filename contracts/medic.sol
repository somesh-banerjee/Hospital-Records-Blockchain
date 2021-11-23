// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;

contract superadmin{
    address admin = 0x473c68D8eBE549F820d15BcE0A493e0d6990a38c;
    mapping(address => bool) public hosAdmin;
    
    struct Patient{
        string name;
        string aadhar;
        string dob;
        string sex;
        string[] docs;
    }
    mapping(address => Patient) public patients;
    mapping(address => bool) public patientexist;
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
        require(hosAdmin[msg.sender]==false);
        patients[msg.sender].name=n;
        patients[msg.sender].aadhar=a;
        patients[msg.sender].dob = d;
        patients[msg.sender].sex = s;
        patList.push(msg.sender);
    }
    
    function upDoc(address pAdd, string memory hash) public{
        require(hosAdmin[msg.sender]);
        patients[pAdd].docs.push(hash);
    }
    
    function getPatients() public view returns (address[] memory) {
        return patList;
    }

    function checkAdmin(address add) public view returns (bool) {
        return hosAdmin[add];
    }
    function checkPatient(address add) public view returns (bool) {
        return patientexist[add];
    }

    function getPatientDetails() public view returns (string memory,string memory, string memory, string memory, string[] memory) {
        return (patients[msg.sender].name,
            patients[msg.sender].aadhar,
            patients[msg.sender].dob,
            patients[msg.sender].sex,
            patients[msg.sender].docs);
    }
}