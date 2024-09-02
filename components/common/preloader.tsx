import React from "react";

const PreLoader = () => {
  return (
    <div className='z-999999 fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-white'>
      <div className='h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent'></div>
    </div>
  );
};

export default PreLoader;
