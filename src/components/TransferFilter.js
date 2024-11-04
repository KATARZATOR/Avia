import React from 'react';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter, toggleAll } from '../store/actions';

function TransferFilter() {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  return (
    <div className="transfer-box">
      <div className="transfer-info">
        <p className="transfer-header">КОЛИЧЕСТВО ПЕРЕСАДОК</p>
        <div className="filter">
          <Checkbox
            checked={filters.all}
            onChange={() => dispatch(toggleAll())}
          >
            Все
          </Checkbox>
        </div>
        <div className="filter">
          <Checkbox
            checked={filters.nonStop}
            onChange={() => dispatch(toggleFilter('nonStop'))}
          >
            Без пересадок
          </Checkbox>
        </div>
        <div className="filter">
          <Checkbox
            checked={filters.oneStop}
            onChange={() => dispatch(toggleFilter('oneStop'))}
          >
            1 пересадка
          </Checkbox>
        </div>
        <div className="filter">
          <Checkbox
            checked={filters.twoStops}
            onChange={() => dispatch(toggleFilter('twoStops'))}
          >
            2 пересадки
          </Checkbox>
        </div>
        <div className="filter">
          <Checkbox
            checked={filters.threeStops}
            onChange={() => dispatch(toggleFilter('threeStops'))}
          >
            3 пересадки
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

export default TransferFilter;
