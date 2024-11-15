/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://denisugiarto.my.id',
  generateRobotsTxt: true,
  generateIndexSitemaps: true
}