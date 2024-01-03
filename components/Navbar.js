import Link from "next/link";
import { useCart } from './CartContext';
import { FaHome, FaShoppingCart, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="bg-white p-4 flex items-center justify-between fixed top-0 w-full z-50">
      <div className="flex items-center">
        <Link href="/">
          <img src="/images/d.png" alt="Logo" className="w-16 h-16 mr-4" />
        </Link>
      </div>
      <div>
        <img src="/images/c.png" alt="image" className="w-25 h-20 mr-90" />
      </div>
      <div className="flex items-center">
        <Link href="/">
          <h2 className="mr-4 font-bold text-1xl">Home</h2>
        </Link>

        <Link href="/products">
          <h2 className="mr-4 font-bold text-1xl">Products</h2>
        </Link>
        <Link href="/pages">
          <h2 className="mr-4 font-bold text-1xl">Pages</h2>
        </Link>
        <Link href="/blog">
          <h2 className="mr-4 font-bold text-1xl">Blog</h2>
        </Link>
        <Link href="/contact">
          <h2 className="mr-4 font-bold text-1xl">Contact</h2>
        </Link>
        <img
          src="/images/1.png"
          alt="Search Icon"
          className="w-4 h-4 cursor-pointer mr-4"
        />
        <span className="mr-4 relative">
        </span>
        <Link href="/cart" className="relative">
          <img
            src="/images/8.png"
            alt="Cart Icon"
            className="w-7 h-7 cursor-pointer"
          />
          <div className="rounded-full bg-red-500 text-white w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
            {cart?.length || 0}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
