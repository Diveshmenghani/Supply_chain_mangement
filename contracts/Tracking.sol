// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Tracking{
    enum ShipmentStatus { PENDING, IN_TRANSIT , DELIVERED }

    struct Shipment{
        address sender;
        address reciver;
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(address=> Shipment[]) public shipments;
    uint public shipmentCount;

    struct TyepShipment{
        address sender;
        address reciver;
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    TyepShipment[] tyepShipments;

    event ShipmentCreated(address indexed sender,address indexed reciver,uint pickupTime,uint distance,uint price);
    event ShipmentInTransit(address indexed sender,address indexed reciver,uint pickupTime);
    event ShipmentDelivered(address indexed sender,address indexed reciver,uint deliveryTime);
    event ShipmentPaid(address indexed sender,address indexed reciver,uint amount);

    constructor(){
        shipmentCount = 0;
    }

    function createShipment(address reciver,uint pickupTime,uint distance,uint price) public payable{
        require(msg.value == price,"Please send the exact amount");
        
        shipments[msg.sender].push(Shipment(msg.sender,reciver,pickupTime,0,distance,price,ShipmentStatus.PENDING,false));
        tyepShipments.push(TyepShipment(msg.sender,reciver,pickupTime,0,distance,price,ShipmentStatus.PENDING,false));
        shipmentCount ++;
        emit ShipmentCreated(msg.sender,reciver,pickupTime,distance,price);
    }

    function startShipment(address _sender,address _reciver,uint _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];
        require(shipment.status == ShipmentStatus.PENDING,"Shipment is not pending");
        require(shipment.sender == _sender,"Invalide Sender");
        
        shipment.status = ShipmentStatus.IN_TRANSIT;
        tyepShipment.status = ShipmentStatus.IN_TRANSIT;
        emit ShipmentInTransit(msg.sender,_reciver,shipment.pickupTime);
     }
     function completeShipment(address _sender,address _reciver,uint _index) public payable{
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];
        
        require(shipment.status == ShipmentStatus.IN_TRANSIT,"Shipment is not in transit");
        require(shipment.reciver == _reciver,"You are not the sender");
        require(!shipment.isPaid,"Spment alerady paied");
        
        shipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;
        tyepShipment.status = ShipmentStatus.DELIVERED;
        tyepShipment.deliveryTime = block.timestamp;
        uint amount = shipment.price;
        payable(shipment.sender).transfer(amount);
        shipment.isPaid = true;
        tyepShipment.isPaid = true;
        emit ShipmentPaid(msg.sender,_reciver,amount);
        emit ShipmentDelivered(msg.sender,_reciver,shipment.deliveryTime);
    }
    
    function getShipment(address _sender, uint _index)public view returns(address,address,uint,uint,uint,uint, ShipmentStatus,bool){
    Shipment memory shipment = shipments[_sender][_index];
    return (shipment.sender,shipment.reciver,shipment.pickupTime,shipment.deliveryTime,shipment.distance,shipment.price,shipment.status,shipment.isPaid);
    }

    function getShipmentCount(address _sender) public view returns(uint){
        return shipments[_sender].length;
    }

    function getAlltransction() public view returns(TyepShipment[] memory){
        return tyepShipments;
    }


}

