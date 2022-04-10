import conf from '@/assets/conf'
const getHeaders = () => {
  const env = process.env.NODE_ENV
  if (env === 'production') {
    return {
      token: sessionStorage.getItem(conf.SESSION_KEY + 'Authorization') || '',
    }
  } else {
    return {
      token: sessionStorage.getItem(conf.SESSION_KEY + 'Authorization') || '',
    }
  }
}

export default getHeaders
