
import Link from "next/link";
import { useCart } from './CartContext';
import { FaHome, FaShoppingCart, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="bg-white p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <Link href="/">
          <img src="/images/d.png" alt="Logo" className="w-8 h-8 mr-4" />
        </Link>
      </div>
      <div>
        <img src="/images/c.png" alt="image" className="w-15 h-10 mr-90" />
      </div>
      <div className="flex items-center">
        <Link href="/">
          <span className="mr-4">Home</span>
        </Link>

        <Link href="/products">
          <span className="mr-4">Products</span>
        </Link>
        <Link href="/pages">
          <span className="mr-4">Pages</span>
        </Link>
        <Link href="/blog">
          <span className="mr-4">Blog</span>
        </Link>
        <Link href="/contact">
          <span className="mr-4">Contact</span>
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
