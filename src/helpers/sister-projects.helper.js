import * as fs from 'fs'
import axios from 'axios'
import * as Cheerio from 'cheerio'
import { Parser } from 'json2csv'

/**
 * This function will scrape the Wikipedia's Sister Projects Link: https://en.wikipedia.org/wiki/Main_Page#:~:text=Wikipedia%27s%20sister%20projects
 *
 * @returns void
 */
const getSisterProjects = async () => {
  const wikiPediaURL = 'https://en.wikipedia.org/wiki/Main_Page/'
  const sisterProjects = []

  try {
    const response = await axios.get(wikiPediaURL)
    const $ = Cheerio.load(response.data)
    const relatedProjectsData = $('#sister-projects-list li')

    relatedProjectsData.each(function () {
      const imageSrc = $(this).find('img').attr('src')
      const title = $(this).find('.extiw').text()

      const description = $(this)
        .find('div:eq(1)')
        .contents()
        .filter(function () {
          return this.nodeType === 3
        })
        .text()

      sisterProjects.push({
        imageSrc: imageSrc,
        title: title,
        description: description,
      })
    })

    const parser = new Parser()
    const csv = parser.parse(sisterProjects)
    fs.writeFileSync('./src/files/sister-projects.csv', csv)
  } catch (error) {
    console.error(error)
  }
}

export default getSisterProjects
