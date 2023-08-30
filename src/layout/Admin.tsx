import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/sidebar/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { UserProvider } from "../context/UserContext";

function Admin(props :any)
{
    return (
      <UserProvider>
        <SidebarProvider>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex flex-col flex-1 w-full">
              <Navbar />

              <main className="h-full overflow-y-auto">
                <div className="container p-6 mx-auto grid">
                  {props.children}
                </div>
              </main>
            </div>
          </div>

          <script
            crossOrigin="anonymous"
            src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.js"
          ></script>
        </SidebarProvider>
      </UserProvider>
    );
}

export default Admin;