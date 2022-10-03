import * as fs from 'fs'
import axios from 'axios'
import * as Cheerio from 'cheerio'
import { Parser } from 'json2csv'

import message from '../message.helper.js'

/**
 * This function will scrape the Wikipedia's Sister Projects
 * Link: https://en.wikipedia.org/wiki/Main_Page#:~:text=Wikipedia%27s%20sister%20projects
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
      const projectLink = $(this).find('.extiw').attr('href')

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
        projectLink: projectLink,
        description: description,
      })
    })

    // Instantiate parser.
    const parser = new Parser()

    // Parse JSON or object data to CSV.
    const csv = parser.parse(sisterProjects)

    // Add or update file.
    fs.writeFileSync('./src/files/sister-projects.csv', csv)

    await message(
      false,
      'Successfully saving Wikipedia data. Please check the files directory.',
    )
  } catch (error) {
    await message(true, `Something\'s wrong. ${error.message}`)
  }
}

export default getSisterProjects
