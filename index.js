const axios = require('axios');
const cron = require('node-cron');
const config = require('./config.json');
const notifier = require('node-notifier');
const open = require('open');

cron.schedule('* * * * *', async () =>  {
    const apiURL = config.instantOnly ? config.instantURL : config.normalURL;
    const firstReq = await axios.get(apiURL)
.catch(err => {
    console.log(err);
    return;
});

        const knifeName = firstReq.data?.items[0]?.asset?.names?.full;
        const knifePriceOG = firstReq.data?.items[0]?.pricing?.default;
        const knifePrice = parseFloat(firstReq.data?.items[0]?.pricing?.computed);
        const knifeImage = firstReq.data?.items[0]?.asset?.images?.steam;
        const knifeWear = firstReq.data?.items[0]?.asset?.float;
        const knifeDiscount = firstReq.data?.items[0]?.pricing?.discount.toString().split('.')[1].substring(0, 2);
        const knifeQuality = firstReq.data?.items[0]?.asset?.quality;


        if (knifePrice < parseFloat(config.alertPrice)) {
        const embed = JSON.stringify({
            "content": null,
            "embeds": [
              {
                "color": null,
                "fields": [
                  {
                    "name": "Original Price",
                    "value": `$${knifePriceOG}`,
                    "inline": true
                  },
                  {
                    "name": "Current Price",
                    "value": `$${knifePrice}`,
                    "inline": true
                  },
                  {
                    "name": "Discount",
                    "value": `${knifeDiscount}%`,
                    "inline": true
                  },
                  {
                    "name": "Float",
                    "value": `${knifeWear}`,
                    "inline": true
                  },
                  {
                    "name": "Quality",
                    "value": `${knifeQuality}`,
                    "inline": true
                  }
                ],
                "author": {
                  "name": `${knifeName}`,
                },
                "footer": {
                  "text": "Provided by https://github.com/k0nf/csmoney-market-sniper"
                },
                "image": {
                  "url": `${knifeImage}`
                },
                "thumbnail": {
                  "url": `${knifeImage}`
                }
              }
            ],
            "attachments": []
          });
          notifier.notify({
            title: `New Knife!`,
            message: `Found ${knifeName} for ${knifePrice} (${knifeDiscount}%)`,
            sound: true, 
            wait: true,
            timeout: 10
         });
       
         notifier.on('click', function (notifierObject, options, event) {
            open('https://cs.money/market/buy/');
                  });
      

   const sendWH = await axios.post(config.discordWebhook, embed, {
            headers: { "Content-Type": "application/json" },
          }).catch(err => {
            console.log(err);
            return;
        });
    }
        console.log({knifeName, knifePriceOG, knifePrice, knifeImage, knifeWear, knifeDiscount, knifeQuality});
      
  });