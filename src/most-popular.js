const cheerio = require('cheerio')
const axios = require('axios')

const lazadaURL = 'https://www.lazada.com.ph/'

async function getMostPopularSection() {
  try {
    const response = await axios.get(lazadaURL)
    const $ = cheerio.load(response.data)
    const title = $('#hp-most-popular h3').text()
    console.log(title)
  } catch (error) {
    console.error(error)
  }
}

getMostPopularSection()
