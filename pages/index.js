import Products from "./products";



const Home = () => {
  return (
    <div className="mx-10">
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 relative">
        <div className="relative">
          <p className="text-lg">
            <b>
              Handmade,<br></br> With an Extra<br></br> Pinch Of{" "}
              <span style={{ color: "red" }}>Love</span>
            </b>
            <br></br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="button">
            <img
              src="/images/n.png"
              alt="Cart Icon"
              className="w-2 h-33cursor-pointer"
            />
            ORDER NOW
          </button>
        </div>
        <div className="relative w-1/2 h-full ml-auto mr-0">
          <div className="absolute bottom-0 left-0 w-full h-full bg-yellow-400 rounded-bl-full rounded-tl-full"></div>
          <div>
            <img
              src="/images/6.png"
              alt="Welcome Image"
              className="w-full h-full relative z-10"
              style={{ width: "100px", height: "100px", marginLeft: "-40px" }}
            />
            <img
              src="/images/m.png"
              alt="Welcome Image"
              className="w-full h-full relative z-10"
              style={{ width: "50px", height: "50px", marginLeft: "-200px" }}
            />
            <img
              src="/images/l.png"
              alt="Welcome Image"
              className="w-full h-full relative z-10"
              style={{ width: "50px", height: "50px", marginLeft: "-10px" }}
            />
          </div>
        </div>
        <div></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 text-center">
          <img
            src="/images/5.png"
            alt="Welcome Image"
            className="w-full h-full relative z-10"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <div className=" p-6 text-center">
          <p className="text-lg">
            <b>
              Daily fresh and,<br></br> always tasty
            </b>
            <br></br>
            There are many variations of passages of
            <br></br>
            Lorem ipsum availlable, but the majority <br></br>
            haved
          </p>
        </div>
        <div className=" p-2 text-center">
          <img
            src="/images/o.png"
            alt="Welcome Image"
            className="w-full h-full relative z-10"
            style={{ width: "30px", height: "30px", marginTop: "50px" }}
          />
        </div>
      </div>
      <div>
        <h5 style={{ color: "red" }}>Popular Dishes</h5>
        <h3 className="text-4xl font-bold mb-4">Browse our Menu</h3>
        <Products/>
      </div>
      <div>
        <h5 style={{ color: "red" }}>Our Strength</h5>
        <h3 className="text-4xl font-bold mb-4">Why We Are The Best?</h3>
        <div className="flex">
          <div className="flex-1 text-center">
            🍚
            <h4 className="text-lg font-bold mb-2">All Kinds of Foods</h4>
            <p>
              {" "}
              Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex-1 text-center">
            💮
            <h4 className="text-lg font-bold mb-2">All Kinds of Foods</h4>
            <p>
              {" "}
              Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex-1 text-center">
            ☺️
            <h4 className="text-lg font-bold mb-2">All Kinds of Foods</h4>
            <p>
              {" "}
              Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex-1 text-center">
            <img
              src="/images/q.png"
              style={{ width: "20px", height: "20px" }}
            />
            <h4 className="text-lg font-bold mb-2">All Kinds of Foods</h4>
            <p>
              {" "}
              Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
      below{" "}
      <div>
        <img
          src="/images/v.png"
          className="w-full h-full relative z-10"
          style={{ width: "30px", height: "30px", marginTop: "40px" }}
        />
        <h5 style={{ color: "red" }}>Customer Feedback</h5>
        <h3 className="text-4xl font-bold mb-4">Client Testimonials</h3>

        <div className="flex">
          <div className="flex-1 text-center">
            <div className="border p-4 rounded-lg">
              <img
                src="/images/aa.jpg"
                alt="Takar Bowa 1"
                className="w-16 h-16 rounded-full mb-4"
              />
              <h4 className="text-lg font-bold mb-2">Takar Bowa</h4>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="border p-4 rounded-lg">
              <img
                src="/images/bb.jpg"
                alt="Takar Bowa 2"
                className="w-16 h-16 rounded-full mb-4"
              />
              <h4 className="text-lg font-bold mb-2">Takar Bowa</h4>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="border p-4 rounded-lg">
              <img
                src="/images/cc.jpg"
                alt="Takar Bowa 3"
                className="w-16 h-16 rounded-full mb-4"
              />
              <h4 className="text-lg font-bold mb-2">Takar Bowa</h4>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="border p-4 rounded-lg">
              <img
                src="/images/dd.jpg"
                alt="Takar Bowa 4"
                className="w-16 h-16 rounded-full mb-4"
              />
              <h4 className="text-lg font-bold mb-2">Takar Bowa</h4>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
