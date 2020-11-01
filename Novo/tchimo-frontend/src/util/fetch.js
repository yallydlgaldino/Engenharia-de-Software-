import axios from 'axios'

const publicFetch = axios.create({
  baseURL: 'http://tchimo-webservice.herokuapp.com/api/'
})

export { publicFetch }