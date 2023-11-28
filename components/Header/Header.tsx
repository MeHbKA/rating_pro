import HeaderNavBar from "./HeaderNavBar/HeaderNavBar";
import HeaderDrawer from "./Drawer/Drawer";
import BottomNavBar from "./BottomNavBar/BottomNavBar";
import {useEffect, useState} from "react";


export default function Header() {

  const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])


  return (
      <div>
        {width && width >= 1430 ?
            <HeaderNavBar />
            : width >= 960 ?
            <HeaderDrawer />
            :
            <BottomNavBar />
            
        }
      </div>
  );
};