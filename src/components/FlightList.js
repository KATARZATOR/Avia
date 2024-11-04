import React, { useEffect } from 'react';
import FlightCard from './FlightCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../store/actions';
import { Spin } from 'antd';

function FlightList() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);
  const filters = useSelector((state) => state.filters);
  const sortType = useSelector((state) => state.sort);
  const stop = useSelector((state) => state.tickets.stop);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const anyFilterSelected =
    filters.nonStop ||
    filters.oneStop ||
    filters.twoStops ||
    filters.threeStops;

  const filteredTickets = tickets.filter((ticket) => {
    if (!anyFilterSelected) {
      return true;
    }

    return ticket.segments.some((segment) => {
      const stopsCount = segment.stops.length;

      if (filters.nonStop && stopsCount === 0) return true;
      if (filters.oneStop && stopsCount === 1) return true;
      if (filters.twoStops && stopsCount === 2) return true;
      if (filters.threeStops && stopsCount === 3) return true;

      return false;
    });
  });

  const sortedTickets = filteredTickets.sort((a, b) => {
    switch (sortType) {
      case 'CHEAPEST': {
        return a.price - b.price;
      }
      case 'FASTEST': {
        const durationA = a.segments.reduce(
          (sum, segment) => sum + segment.duration,
          0
        );
        const durationB = b.segments.reduce(
          (sum, segment) => sum + segment.duration,
          0
        );
        return durationA - durationB;
      }
      case 'OPTIMAL': {
        const scoreA =
          a.price +
          a.segments.reduce((sum, segment) => sum + segment.duration, 0);
        const scoreB =
          b.price +
          b.segments.reduce((sum, segment) => sum + segment.duration, 0);
        return scoreA - scoreB;
      }
      default:
        return 0;
    }
  });

  return (
    <>
      {!stop && <Spin size="large" style={{ margin: '20px' }} />}
      {error && <div>Ошибка при загрузке билетов: {error}</div>}
      {!loading && sortedTickets.length === 0 && (
        <div>Рейсов, подходящих под заданные фильтры, не найдено</div>
      )}
      <div className="flightcard-box">
        {sortedTickets.slice(0, 5).map((ticket) => (
          <FlightCard
            key={`${ticket.price}-${ticket.carrier}-${ticket.segments[0].date}`}
            ticket={ticket}
          />
        ))}
      </div>
    </>
  );
}

export default FlightList;
