/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === 'true'

const nextConfig = {
  output: isStaticExport ? 'export' : undefined,
  basePath: isStaticExport ? '/my-portfolio' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

