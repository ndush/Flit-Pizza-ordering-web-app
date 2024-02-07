
Welcome to the Flit Pizza Ordering Web App! This application allows users to conveniently order pizzas online from the comfort of their homes. It is built using Next.js with MongoDB integration.

Features
View Products: Users can browse through all available pizzas.
View Single Product: Users can view detailed information about a specific pizza.
Add to Cart: Users can add pizzas to their shopping cart.
Order Processing: Users can process their orders securely.
Admin Panel: Admins can log in, add new pizzas to the menu, view orders, and manage delivery.
Technologies Used
Frontend:

Next.js
React.js
Tailwind CSS for styling
Backend:

MongoDB for database management
Next.js API routes for backend logic
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/ndush/flit-pizza-ordering-web-app.git
Install dependencies:

bash
Copy code
cd flit-pizza-ordering-web-app
npm install
Configure environment variables:

Create a .env.local file in the root directory.
Add the following variables:
makefile
Copy code
MONGODB_URI=your_mongodb_uri
Run the application:


Copy code
npm run dev
Access the application:

Open your browser and go to http://localhost:3000.
Admin Panel
To access the admin panel:

Go to http://localhost:3000/admin
Use the following credentials:
Username: admin
Password: adminpassword
Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Special thanks to XYZ Pizza Company for inspiration and sample data.
