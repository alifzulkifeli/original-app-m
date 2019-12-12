
const cheerio = require('cheerio');
const fetch = require('node-fetch');
var request = require("request");

exports.listSearch = (req, res) => {
    const item = [];
    const price = '4';
    getvals().then(price => { 

    fetch(`https://www.mercari.com/jp/search/?page=${req.query.page||1}&keyword=${req.query.search}&price_min=${req.query.min_price || ""}&price_max=${req.query.max_price || ""}`)

      .then(res => res.text())
      .then(body => {
        
        const $ = cheerio.load(body,
          {
            withDomLvl1: true,
            normalizeWhitespace: false,
            xmlMode: true,
            decodeEntities: true
          }
        );
        $('.items-box a').each((i,el) => {

          const mercari_item = {
            name : $(el).find('.items-box-name').text(),
            // price : parseInt($(el).find('.items-box-price').text().substr(1)) ,
            price : parseFloat($(el).find('.items-box-price').text().substr(1).replace(/,/g, '')) * parseFloat(price || 3.8),
            link : $(el).attr('href'),
            image1 : $(el).children().children().attr('data-src'),
            description : ''
          }
        
          mercari_item.price = (Math.round(mercari_item.price * 100) / 100).toFixed(2);

          item.push(mercari_item);
  
        });
        res.json(item);
        
      });
    });

    };


function getvals(){
  return fetch('https://api.exchangeratesapi.io/latest?base=JPY',
  {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((responseData) => {
    return responseData.rates.MYR;
  })
  .catch(error => console.warn(error));
}



