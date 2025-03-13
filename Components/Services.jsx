import images from "../Images/index";
import Image from "next/image"; 

export default ({
  setopenProfile,
  setcompleteModel,
  setgetModel,
  setstartModel,
}) => {
  const team = [
    {
      avatar: images.compShipment,
    },
    {
      avatar: images.getShipment,
    },
    {
      avatar: images.startShipment,
    },
    {
      avatar: images.userProfile,
    },
    {
      avatar: images.shipCount,
    },
    {
      avatar: images.send,
    },
  ];
  const openModelBox =(text) =>{
      if(text == 1 ){
      setcompleteModel(true);
    } else if (text == 2 ) {
      setgetModel(true);
    } else if (text == 3 ){
      setstartModel(true);
    } else if (text == 4 ){
      setopenProfile(true);
    }
  };
  return(
    <section classNme ="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-clos-3">
            {team.map((item, i)=>(
              <li key={i}>
                <div 
                onClick={() => openModelBox(i + 1)}
                className="w-full h-60 h-0 sm:h-52 md:h-56"
                ><Image src={item.avatar}
                  className="w-full h-full object-cover object-center shadow-md rounded-xl"
                  alt="" />
                  </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );

};
