import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from '../../store/actions';

function HeaderFilter() {
  const dispatch = useDispatch();

  return (
    <div className="button-style">
      <button
        className="btn btn1"
        onClick={() => dispatch(setSortType('CHEAPEST'))}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className="btn btn2"
        onClick={() => dispatch(setSortType('FASTEST'))}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className="btn btn3"
        onClick={() => dispatch(setSortType('OPTIMAL'))}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}

export default HeaderFilter;
