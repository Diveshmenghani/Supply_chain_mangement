export default  ({setcreateShipmentModel, allShipmentsdata}) => {
  const converTime =(time) =>{
    const newTime = new Date (time);
    const dateTime = new Intl.DateTimeFormat("en-US",{
      year:"numeric",
      month:"2-digit",
      day: "2-digit",
    }).format(newTime);

    return dateTime;
  };


  return(
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex mt-4 mb-4">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl front-bold sm:text-2xl">
            Create Tracking
          </h3>
          <p className="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p 
          onClick={() => setcreateShipmentModel(true)}
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 
          hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex cursor-pointer"
        >
          Add Tracking
        </p>
        </div>
      </div>
      <div className="mt=12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Reciver</th>
              <th className="py-3 px-6">Pickuptime</th>
              <th className="py-3 px-6">Distance</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Delivery Time</th>
              <th className="py-3 px-6">Paid</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allShipmentsdata?.map((shipment, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.sender.slice(0,15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.reciver.slice(0,15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(shipment.pickupTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.distance} km
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.price} 
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.deliveryTime} 
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  { shipment.isPaid ? "Completed" : "Not Complete" }     
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {shipment.status === 0
                  ? "Pending"
                   : shipment.status === 1
                  ? "IN_TRANSIT"
                  : "Delivered"}
                </td>
                </tr>  
            ))}
          </tbody>
        </table>
      </div>
    </div> 
  );
};
