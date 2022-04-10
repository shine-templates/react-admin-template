import packages from '../../../package.json'
const projectPathName = packages['name']
const projectName = packages['description']

export default {
  title: projectName,
  SESSION_KEY: `${projectPathName}_${process.env.NODE_ENV}_`,
  basename: `/${projectPathName}`,
}
