function respond(input) {
  input = input.toLowerCase();

  if (input.includes('hello') || input.includes('hi')) {
    return "Welcome to Leos Fashion! How can I assist you today?";
  }

  if (input.includes('cotton') || input.includes('saree')) {
    return "Yes, we have a wide range of cotton sarees starting at ₹250/piece.";
  }

  if (input.includes('denim') || input.includes('jeans')) {
    return "We offer denim fabrics starting at ₹180 per meter.";
  }

  if (input.includes('catalog') || input.includes('products')) {
    return "You can explore our catalog at www.leosfashion.in/catalog (imaginary link).";
  }

  if (input.includes('bulk') || input.includes('wholesale')) {
    return "We specialize in wholesale. Minimum order is ₹10,000. Discounts apply on bulk orders.";
  }

  if (input.includes('delivery') || input.includes('shipping')) {
    return "We offer delivery across India. Orders above ₹25,000 get free shipping.";
  }

  if (input.includes('timing') || input.includes('open')) {
    return "Our business hours are Mon–Sat, 9 AM to 7 PM.";
  }

  if (input.includes('contact') || input.includes('phone') || input.includes('number')) {
    return "You can contact us at +91-98765-43210 or email us at support@leosfashion.in";
  }

  if (input.includes('exit') || input.includes('bye')) {
    return "Thank you for visiting Leos Fashion. Have a great day!";
  }

  return "Sorry, I didn't understand that. Please ask about products, orders, delivery, or timings.";
}

module.exports = respond;
