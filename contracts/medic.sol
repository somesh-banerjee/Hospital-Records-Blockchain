// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;

contract superadmin{
    address public admin;
    mapping(address => bool) public hosAdmin;

    constructor(){
        admin = msg.sender;
    }
    
    struct Patient{
        string name;
        string aadhar;
        string dob;
        string sex;
        string[] docs;
        string[] docsD;
    }
    mapping(address => Patient) public patients;
    mapping(address => bool) public patientexist;
    address[] patList;
    string[] patNList;
    
    struct Hospital{
        string name;
    }
    mapping(address => Hospital) public hospitals;
    
    modifier restricted() {
        require(msg.sender == admin);
        _;
    }
    
    function newHospital(string memory n,address u) public restricted{
        require(hosAdmin[u]==false);
        hospitals[u].name = n;
        hosAdmin[u]=true;
    }
    
    function newPatient(string memory n,string memory a, string memory d, string memory s) public{
        require(hosAdmin[msg.sender]==false);
        require(patientexist[msg.sender]==false);
        patients[msg.sender].name=n;
        patients[msg.sender].aadhar=a;
        patients[msg.sender].dob = d;
        patients[msg.sender].sex = s;
        patList.push(msg.sender);
        patientexist[msg.sender]=true;
        patNList.push(n);
    }
    
    function upDoc(address pAdd, string memory hash, string memory docD) public{
        require(hosAdmin[msg.sender]);
        patients[pAdd].docs.push(hash);
        patients[pAdd].docsD.push(docD);
    }
    
    function getPatients() public view returns (address[] memory, string[] memory) {
        return (patList,patNList);
    }

    function checkAdmin(address add) public view returns (bool) {
        return hosAdmin[add];
    }
    function checkPatient(address add) public view returns (bool) {
        return patientexist[add];
    }

    function getPatientDetails(address add) public view returns (string memory,string memory, string memory, string memory, string[] memory, string[] memory) {
        return (patients[add].name,
            patients[add].aadhar,
            patients[add].dob,
            patients[add].sex,
            patients[add].docs,
            patients[add].docsD);
    }

    function getHosDetails(address add) public view returns (string memory) {
        return hospitals[add].name;
    }
}