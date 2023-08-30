import Footer from "../components/guest/Footer";
import Navbar from "../components/guest/Navbar";

function Guest(props: any) {
  return (
    <div className="main-container">
      <Navbar />

      {props.children}

      <Footer />
    </div>
  );
}

export default Guest;
