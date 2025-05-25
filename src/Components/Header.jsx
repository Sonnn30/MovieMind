import React from 'react';

function Header() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 mt-10">
      <h1 className="text-[36px] mb-4">Find Your Next Movie</h1>
      <h3 className="text-[14px]">
        Let our AI help you discover movies similar to the ones you love.
      </h3>
    </div>
  );
}

export default Header;
