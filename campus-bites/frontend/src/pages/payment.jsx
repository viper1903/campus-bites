import React from 'react';
import QRCode from 'qrcode.react';

const Payment = ({ total }) => {
  return (
    <div className="payment" style={{ backgroundColor: 'red' }}>
      <h1>Payment</h1>
      <p>Total: ${total.toFixed(2)}</p>
      <QRCode value={`Total: ${total.toFixed(2)}`} />
    </div>
  );
};

export default Payment;
