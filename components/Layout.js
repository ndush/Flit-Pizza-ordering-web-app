import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div style={{ margin: "10px  " }} className="mx-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
