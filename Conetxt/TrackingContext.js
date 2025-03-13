import React, {useState,useEffect} from 'react';
import Web3Modal from  "web3modal";
import {ethers} from "ethers";

//internal imports
import tracking from"../Conetxt/Tracking.json";
// old address - 0x5FbDB2315678afecb367f032d93F642f64180aa3
const ContractAddress = "0x45645ce3E8e6FD2f5B2c924A61B388dfCD36071c";
const ContarctABI = tracking.abi;
// console.log(ContarctABI);
//facting smart contract

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress,ContarctABI,signerOrProvider);

export const TrackingContext = React.createContext();
export const TrackingProvider = ({children}) => {

    const DappName = "Prodect Tracking Dapp";
    const [currentUser , setCurrentUser] = useState("");

    const createShipment =async(items) =>{
        console.log(items);
        const { reciver, pickupTime, distance, price} = items;

        try {
            const web3modal= new Web3Modal();
        
            const connection = await web3modal.connect();
            
            const provider = new ethers.providers.Web3Provider(connection);
    
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
    
            const createIteam = await contract.createShipment(
                reciver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price,18),
            {
                value: ethers.utils.parseUnits(price,18),      
            }
        );
            await createIteam.wait();
            console.log(createIteam);
        } catch (error) {
            console.error("Error details:", error);
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
    };
    
    const getAllShipment = async () => {
        try{
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const contract = fetchContract(provider);

            const shipment = await contract.getAlltransction();
            
            const allShipments = shipment.map((shipment) => ({
                sender: shipment.sender,
                reciver: shipment.reciver,
                price: ethers.utils.formatEther(shipment.price),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }));
            return allShipments
          }catch(error) {
            console.log("error want, getting shipment", error);
          }
    };
    
    const getShipmentsCount = async () =>{
        try{
            if (!window.ethereum) return "Install Metamask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const contract = fetchContract(provider);
            const shipmentCount = await contract.getShipmentCount(accounts[0]);
            return shipmentCount.toNumber();
        }   catch(error){
            console.log("error want, getting shipment",error);
        }
    };

    const completeSipment = async (completeShip) =>{
        console.log(completeShip);

        const {reciver, index} = completeShip;
        try {
            if (!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transection = await contract.completeShipment(
                accounts[0],
                reciver,
                index,
            );
            transection.wait();
            console.log(transection);
        } catch(error) {
            console.log("wrong completeShipment", error);
        }
    };

    const getShipment = async (index) => {
        console.log(index * 1);
        try {
            if (!window.ethereum) return "Install Metamask";
    
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
    
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
    
            const shipment = await contract.getShipment(accounts[0], index * 1);
            console.log('Raw Shipment Data:', shipment);
    
            const SingleShipment = {
                sender: shipment[0],
                reciver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5]), 
                status: shipment[6],
                isPaid: shipment[7],
            };
    
            console.log('Formatted Shipment Data:', SingleShipment);
            return SingleShipment;
        } catch (error) {
            console.error("Sorry, no shipment found", error);
        }
    };
    
    
    const startShipment = async (getProduct) => {
        const {reciver, index} = getProduct;
        try {
            if (!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(
                accounts[0],
                reciver,
                index * 1
            );

            shipment.wait();
            console.log(shipment);
    }catch (error){
        console.log("sorray no shyipment", error);
        console.log(getProduct);
    }
}; 
// check Wallet Connection
    const checkIfwalletConnected = async () => {
        try {
            if(!window.ethereum) return "Install MataMask"
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length){
                setCurrentUser(accounts[0]);
            } else {
                return "No aacount";
            }
        } catch (error) {
            return "not Connected";
        }
    };
// conect wallet function 
    const connectWallet = async() =>{
        try {
            if(!window.ethereum) return "Install MataMask"
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

                setCurrentUser(accounts[0]);
        } catch (error) {
            return "Someting went wrong";
        }
    };

    useEffect(() =>{
        checkIfwalletConnected();
    }, []);

    return(
        <TrackingContext.Provider
        value={{
            connectWallet,
            createShipment,
            getAllShipment,
            completeSipment,
            getShipment,
            startShipment,
            getShipmentsCount,
            DappName,
            currentUser,
        }}
        >{children}</TrackingContext.Provider>
    )
    
}
