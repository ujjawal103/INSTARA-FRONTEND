import React from 'react';

const StoreInfo = ({ store }) => {
  
  return (
    <div className="m-4 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:w-100">
      <img
        src={store.storeDetails?.photo}
        alt={store.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{store.name}</h2>
        <p className="text-gray-500 mb-2">
          Regular Price: <span className="font-medium">{store.price}</span>
        </p>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          venenatis, nunc sit amet convallis mattis, ligula justo.
        </p>
      </div>
    </div>
  );
};

export default StoreInfo;
