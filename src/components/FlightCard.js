import React from 'react';

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}м`;
}

function formatDate(date, duration) {
  const departureDate = new Date(date);
  const arrivalDate = new Date(departureDate.getTime() + duration * 60000);

  const departureTime = departureDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const arrivalTime = arrivalDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${departureTime} - ${arrivalTime}`;
}

function FlightCard({ ticket }) {
  const { price, carrier, segments } = ticket;

  const carrierLogoUrl = `https://pics.avs.io/99/36/${carrier}.png`;

  return (
    <div className="flight-card">
      <div className="card-header">
        <div className="flight-price">{price} Р</div>
        <img src={carrierLogoUrl} className="card-img" alt="Airline logo" />
      </div>
      <div className="card-info">
        {segments.map((segment, index) => (
          <div key={index}>
            <div className="card-line line1">
              <p className="p-style">
                {segment.origin} – {segment.destination}
              </p>
              <p className="p-style">В ПУТИ</p>
              <p className="p-style">
                {segment.stops.length === 0
                  ? 'БЕЗ ПЕРЕСАДОК'
                  : `${segment.stops.length} ПЕРЕСАДКА${
                      segment.stops.length > 1 ? 'И' : ''
                    }`}
              </p>
            </div>
            <div className="card-line line2">
              <p className="p-style">
                {formatDate(segment.date, segment.duration)}
              </p>
              <p className="p-style">{formatTime(segment.duration)}</p>
              <p className="p-style">{segment.stops.join(', ') || '-'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightCard;
