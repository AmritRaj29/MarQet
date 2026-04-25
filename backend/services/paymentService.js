exports.validatePaymentCombination = ({ mode, deliveryType, paymentType, shopIsSubscribed, shopSelfDelivery }) => {
  // mode="pickup" -> paymentType must be one of: cash_pickup, upi, paylater
  if (mode === 'pickup') {
    if (!['cash_pickup', 'upi', 'paylater'].includes(paymentType)) {
      throw new Error(`Invalid paymentType '${paymentType}' for mode 'pickup'. Allowed: cash_pickup, upi, paylater`);
    }
    if (deliveryType) {
      throw new Error('deliveryType must be null for mode pickup');
    }
  }

  // mode="delivery" -> paymentType must be one of: cash_delivery, upi, paylater
  if (mode === 'delivery') {
    if (!['cash_delivery', 'upi', 'paylater'].includes(paymentType)) {
      throw new Error(`Invalid paymentType '${paymentType}' for mode 'delivery'. Allowed: cash_delivery, upi, paylater`);
    }

    if (deliveryType === 'platform') {
      if (!shopIsSubscribed) {
        throw new Error('Shop must be subscribed to use platform delivery');
      }
    } else if (deliveryType === 'self') {
      if (!shopSelfDelivery) {
        throw new Error('Shop does not offer self delivery');
      }
    } else {
      throw new Error('Invalid or missing deliveryType for mode delivery');
    }
  }

  return true;
};

exports.simulatePayment = (paymentType, amount) => {
  if (paymentType === 'upi') {
    return { success: true, paymentStatus: 'completed' };
  } else {
    // cash or paylater
    return { success: true, paymentStatus: 'pending' };
  }
};
