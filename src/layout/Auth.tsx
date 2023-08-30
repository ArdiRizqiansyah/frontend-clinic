import { UserProvider } from "../context/UserContext";

function Auth(props: any) {
  return (
    <UserProvider>
      <div className="flex items-center min-h-screen p-6 bg-gray-50">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
          {props.children}
        </div>
      </div>
    </UserProvider>
  );
}

export default Auth;
