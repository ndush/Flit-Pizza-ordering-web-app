import Products from "./products";

const Home = () => {
  return (
    <div >
      <section className="custom-section grid grid-cols-1 sm:grid-cols-2 gap-4  ">
        <div className="flex items-center justify-between w-full">
          <div className="relative">
            <h1>
              Handmade,
              <br />
              With an Extra
              <br />
              Pinch Of
              <span style={{ color: "red" }}> Love</span>
            </h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="button font-bold" >
              <img
                src="/images/n.png"
                alt="Cart Icon"
                className="w-2 h-33 cursor-pointer"
              />
              ORDER NOW
            </button>
          </div>

          
            <div className="absolute-container">
              <div className="relative z-10">
                <img
                  src="/images/6.png"
                  alt="Welcome Image"
                  className="welcome-image"
                />
                <img
                  src="/images/m.png"
                  alt="Welcome Image"
                  className="welcome-image-small1"
                />
                <img
                  src="/images/l.png"
                  alt="Welcome Image"
                  className="welcome-image-small2"
                />
              </div>
             
              <div className="absolute bottom-20 right-0 w-[200px] h-[350px] bg-yellow-400 rounded-tl-full rounded-bl-full"></div>
             
            </div>
          
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20">
        <div className="p-4 text-center">
          <img
            src="/images/5.png"
            alt="Welcome Image"
            className="w-full h-full relative z-10"
            style={{ width: "250px", height: "250px" }}
          />
        </div>
        <div className="p-6 text-center">
          <p className="text-lg">
            <b>Daily fresh and, always tasty</b>
            <br />
            There are many variations of passages of
            <br />
            Lorem ipsum available, but the majority have
          </p>
        </div>
        <div className="p-2 text-center">
          <img
            src="/images/o.png"
            alt="Welcome Image"
            className="w-full h-full relative z-10"
            style={{ width: "30px", height: "30px", marginTop: "50px" }}
          />
        </div>
      </section>

      <div>
        <b style={{ color: "red" }}>Popular Dishes</b>
        <h5>Browse our Menu</h5>
        <Products />
      </div>

      <div style={{ position: "relative" }}>
        <img
          src="/images/hlf.png"
          style={{
            width: "70px",
            height: "50px",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
        <div
          style={{
            backgroundColor: "#f0f0f0",
            marginTop: "50px",
            paddingRight: "10px",
            paddingLeft: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <b style={{ color: "red" }}>Our Strength</b>
          <h5 className=" font-bold mb-4">Why We Are The Best?</h5>

          <div
            className="flex"
            style={{ paddingRight: "10px", paddingLeft: "10px" }}
          >
            <div className="flex-1 ">
              <img
                src="/images/sima.png"
                style={{ width: "20px", height: "20px" }}
              />
              <h4 className="font-semibold text-sm">All Kinds of Foods</h4>
              <p>
                Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing
                elit.
              </p>
            </div>
            <div className="flex-1 ">
              <img
                src="/images/fresh.png"
                style={{ width: "20px", height: "20px" }}
              />
              <h4 className="text-4l font-bold mb-2">All Kinds of Foods</h4>
              <p>
                {" "}
                Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing
                elit.
              </p>
            </div>
            <div className="flex-1 ">
              <img
                src="/images/smile.png"
                style={{ width: "20px", height: "20px" }}
              />
              <h4 className="text-4l font-bold mb-2">All Kinds of Foods</h4>
              <p>
                {" "}
                Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing
                elit.
              </p>
            </div>

            <div className="flex-1 ">
              <img
                src="/images/delv.png"
                style={{ width: "20px", height: "20px" }}
              />
              <h4 className="text-4l font-bold mb-2">All Kinds of Foods</h4>
              <p>
                Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing
                elit.
              </p>
            </div>
          </div>
        </div>

        <div>
          <img
            src="/images/v.png"
            className="w-full h-full relative z-10"
            style={{ width: "30px", height: "30px", marginTop: "40px" }}
          />
          <b style={{ color: "red" }}>Customer Feedback</b>
          <h5 className="font-bold mb-4">Client Testimonials</h5>

          <div className="flex">
            <div className="flex-1 text-center mx-auto">
              <div className="border p-4 rounded-lg mb-4 mr-4">
                <img
                  src="/images/aa.jpg"
                  alt="Takar Bowa 1"
                  className="w-16 h-16 rounded-full mb-4 object-cover mx-auto"
                />
                <h4 className="text-lg font-bold mb-2">Takar Bowa</h4>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="flex-1 text-center mx-auto">
              <div className="border p-4 rounded-lg mb-4 mr-4">
                <img
                  src="/images/bb.jpg"
                  alt="Takar Bowa 2"
                  className="w-16 h-16 rounded-full mb-4 object-cover mx-auto"
                />
                <h4 className="text-lg font-bold mb-2">Takar Bowa</h4>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="flex-1 text-center mx-auto">
              <div className="border p-4 rounded-lg mb-4 mr-4">
                <img
                  src="/images/cc.jpg"
                  alt="Takar Bowa 3"
                  className="w-16 h-16 rounded-full mb-4 object-cover mx-auto"
                />
                <h4 className="text-lg font-bold mb-2">Takar Bowa</h4>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="flex-1 text-center mx-auto">
              <div className="border p-4 rounded-lg mb-4 mr-4">
                <img
                  src="/images/dd.jpg"
                  alt="Takar Bowa 4"
                  className="w-16 h-16 rounded-full mb-4 object-cover mx-auto"
                />

                <h4 className="text-lg font-bold mb-2">Takar Bowa</h4>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
