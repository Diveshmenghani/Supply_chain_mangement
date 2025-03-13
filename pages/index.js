import React,{ useState, useEffect, useContext} from 'react'
import {
 Table ,
 Form ,
 Services,
 Profile ,
 GetShipment ,
 CompleteShipment ,
 StartShipment,
} from "../Components/index";
import { TrackingContext, TrackingProvider } from "../Conetxt/TrackingContext";

const index =() =>{
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeSipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);
   //StateVariable
   const [createShipmentModel, setcreateShipmentModel] = useState(false);
   const [openProfile, setopenProfile] = useState(false);
   const [startModel, setstartModel] = useState(false);
   const [completeModel, setcompleteModel] = useState(false);
   const [getModel, setgetModel] = useState(false);
   //data stae variable
   const [allShipmentsdata, setallShipmentsdata] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllShipment();
      setallShipmentsdata(allData);
    };
  
    fetchData();
  }, []);
  
  return  (
    <>
    <Services
    setopenProfile={setopenProfile}
    setcompleteModel={setcompleteModel}
    setgetModel={setgetModel}
    setstartModel={setstartModel}
    />
    <Table
    setcreateShipmentModel={setcreateShipmentModel}
    allShipmentsdata={allShipmentsdata}
    />
    <Form
    createShipmentModel={createShipmentModel}
    createShipment={createShipment}
    setcreateShipmentModel={setcreateShipmentModel}
    />
    <Profile
    openProfile={openProfile}
    setopenProfile={setopenProfile}
    currentUser={currentUser}
    getShipmentsCount={getShipmentsCount}
    />
    <CompleteShipment
    completeModel={completeModel}
    setcompleteModel={setcompleteModel}
    completeSipment={completeSipment}
    />
    <GetShipment
    getModel={getModel}
    setgetModel={setgetModel}
    getShipment={getShipment}
    />
    <StartShipment
    startModel={startModel}
    setstartModel={setstartModel}
    startShipment={startShipment}
    />
    </>
  );
};

export default index