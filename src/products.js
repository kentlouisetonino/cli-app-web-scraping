const cheerio = require('cheerio')
const axios = require('axios')
const j2cp = require('json2csv').Parser
const fs = require('fs')

const wikiPediaURL = 'https://en.wikipedia.org/wiki/Main_Page/'
const relatedProjects = []

const getRelatedProjects = async () => {
  try {
    const response = await axios.get(wikiPediaURL)
    const $ = cheerio.load(response.data)
    const relatedProjectsData = $('#sister-projects-list li')
    console.log(relatedProjectsData)

    relatedProjectsData.each(function() {
      const title = $(this).find('.extiw').text()
      console.log(title)
    })

    // console.log('Products Data', productsData)
  } catch (error) {
    console.error(error)
  }
}

getRelatedProjects()
