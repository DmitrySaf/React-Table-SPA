import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './assets/styles/index.scss'
import $host from './http';

const getData = async () => {
  const flightsData = await (await $host.get('/')).data;

  return flightsData
}

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App flights={await getData()} />
  </React.StrictMode>
)
