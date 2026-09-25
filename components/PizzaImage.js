import Image from 'next/image';

// Local images get optimised; admin-entered https URLs are shown as-is.
export default function PizzaImage({ src, alt, className = '', sizes = '300px', priority }) {
  return (
    <div className={`relative ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={!src.startsWith('/')} className="object-contain" />
    </div>
  );
}
