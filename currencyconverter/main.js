


const apiKey = 'cd5b53ed54333c4e57c5518a'


document.addEventListener('DOMContentLoaded', () => {
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');

  //to fetch api
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
          const option1 = document.createElement('option');
          const option2 = document.createElement('option');
          option1.value = currency;
          option2.value = currency;
          option1.textContent = currency;
          option2.textContent = currency;
          fromCurrency.appendChild(option1);
          toCurrency.appendChild(option2);
        });
      } else {
        console.error('Error fetching currency list:', data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Convert currency function
document.getElementById('convertBtn').addEventListener('click', () => {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const resultText = document.getElementById('resultText');

  // Validate amount
  if (amount === '' || isNaN(amount)) {
    resultText.textContent = 'Please enter a valid amount.';
    return;
  }

  // Fetch the conversion rate and calculate the result
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`)
    .then(response => response.json())
    .then(data => {
      console.log('API Response:', data); // Log the API response for debugging
      if (data.result === 'success') {
        const convertedAmount = data.conversion_result;
        resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } else {
        resultText.textContent = 'Error fetching conversion rate.';
        console.error('Error:', data);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      resultText.textContent = 'Error fetching conversion rate. Please try again later.';
    });
});
