import React, { useReducer, useState } from "react";
// import useFetch from "../custom-hooks/fetch";

const Dashboard = () => {
//   let { product = [] } = useFetch("http://localhost:4000/product");

  let COUNTE_ACTION = {
    INCERMENT: "increment",
    DECREMENT: "decrement",
    RESET: "reset",
  }

  let handleFunction = (state, action) => {
    switch (action.type) {
      case COUNTE_ACTION.INCERMENT:
        return { ...state, count: state.count + 1 }

      case COUNTE_ACTION.DECREMENT:
        return { ...state, count: state.count > 0 ? state.count - 1 : 0 }

      case COUNTE_ACTION.RESET:
        return { ...state, count: 0 }
    }
  }

  const [state, dispatch] = useReducer(handleFunction, { count: 0 })



  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* <p className="mb-2">Total Products: {product.length}</p> */}

      <div className="flex items-center gap-4">
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => { dispatch({ type: COUNTE_ACTION.DECREMENT }) }}
        >
          -
        </button>
        <span className="text-lg font-semibold">Total Count - {state.count} </span>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded"
          onClick={() => { dispatch({ type: COUNTE_ACTION.INCERMENT }) }}
        >
          +
        </button>
      </div>
      <div>
        <button className="px-3 py-1 mt-2 bg-green-500 text-white rounded" onClick={() => { dispatch({ type: COUNTE_ACTION.RESET }) }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
