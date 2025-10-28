import React from 'react';
import territoryJacket from '../assets/REVIT-TERRITORY-JACKET.webp';
import sambaGlove from '../assets/HELD-SAMBIA-GLOVE.webp';
import arrowShoes from '../assets/REVIT-ARROW-SHOES.webp';
import ventureXTPants from '../assets/ALPINESTARS-VENTURE-XT-PANTS.webp';

const ProductCard = ({ image, name, href }) => (
  <a href={href} className="bg-white p-4 rounded-lg shadow-md text-center block no-underline transition-all duration-400 ease-in-out transform scale-100 hover:scale-110 hover:shadow-lg">
    <img src={image} alt={name} className="w-full h-48 object-cover mb-2 transition-all duration-400 ease-in-out" />
    <p className="text-gray-800 font-semibold">{name}</p>
  </a>
);

const ProductShowcase = () => {
  const products = [
    { name: "REV'IT! Territory Jacket", image: territoryJacket, href: "/product/territory-jacket" },
    { name: "Held Samba Glove", image: sambaGlove, href: "/product/samba-glove" },
    { name: "REV'IT! Arrow Shoes", image: arrowShoes, href: "/product/arrow-shoes" },
    { name: "Alpinestars Venture XT Pants", image: ventureXTPants, href: "/product/venture-xt-pants" },
  ];

  return (
    <div className="bg-gray-900 text-white flex flex-col justify-center py-20">
      <h1 className="text-2xl font-bold mb-6 text-center">WHAT'S LEADING THE PACK</h1>
      <hr className="w-full max-w-5xl mx-auto border-t-2 border-gray-200 bg-gray-200 mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
        {products.map((product, index) => (
          <ProductCard key={index} image={product.image} name={product.name} />
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;