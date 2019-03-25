class Element {
  mount(el) {
    if (typeof el === "string") {
      el = document.querySelector(el);
    }

    el.innerHTML = `
      <input id="stripe-cardnumber" name="cardnumber" placeholder="cardnumber" size="16" type="text">
      <input name="exp-date" placeholder="exp-date" size="6" type="text">
      <input name="cvc" placeholder="cvc" size="3" type="text">
    `;
  }
}

window.Stripe = () => {
  const fetchLastFour = () => {
    return document.getElementById("stripe-cardnumber").value.substr(-4, 4);
  };

  return {
    elements: () => {
      return {
        create: (type, options) => new Element()
      };
    },

    createToken: card => {
      return new Promise(resolve => {
        const expiryDateParts = document.querySelector('input[name="exp-date"]').value.split('/');
        let expiryMonth = '';
        let expiryYear = '';
        if (expiryDateParts.length === 2) {
          expiryMonth = expiryDateParts[0].replace(/^0/, '');
          expiryYear = '20' + expiryDateParts[1];
        }
        resolve({ token: { id: "tok_123", card: { brand: "Visa", last4: fetchLastFour(), exp_month: expiryMonth, exp_year: expiryYear } } });
      });
    }
  };
};
