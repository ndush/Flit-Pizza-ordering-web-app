
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mx-10">
        {children}
        <Footer />
      
      </div>
    </>
  );
};

export default Layout;
