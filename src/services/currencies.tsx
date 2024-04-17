const fetchCurrencies = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    const currenciesArray = Object.keys(currencies)
      .filter((currency) => currency !== 'USDT');
    return currenciesArray;
  } catch (error) {
    console.error('Erro ao obter moedas:', error);
  }
};

export default fetchCurrencies;
