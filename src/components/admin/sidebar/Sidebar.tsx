import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

function Sidebar()
{
    return (
      <>
        {/* sidebar */}
        <DesktopSidebar/>

        {/* mobile sidebar */}
        <MobileSidebar/>
      </>
    );
}

export default Sidebar;