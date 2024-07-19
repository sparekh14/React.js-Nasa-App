import Footer from './components/Footer'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleDisplayModal() {
    setShowModal(!showModal)
  }

  // Fetch data from NASA API and store it in local storage for caching purposes
  // Since the dependency array is empty, this effect will only run once when the component mounts
  useEffect(() => {

    // Handles fetching data from the NASA API and caching logic
    async function fetchData() {
      // Get the NASA API key from the environment variables
      const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY

      // Construct the URL for the NASA API
      const url = "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_API_KEY}`

      // Get the current date and format it as a string
      const today = (new Date()).toDateString()

      // Generate a unique key for today's date prefixed with "NASA-"
      const localKey = `NASA-${today}`

      // Check if the data for today's date is already cached in local storage
      if (localStorage.getItem(localKey)) {
        // If the data is cached, parse it and obtain the data
        const apiData = JSON.parse(localStorage.getItem(localKey))

        // Set the data state to the cached data
        setData(apiData)

        // Exit the function early to prevent fetching data from the API
        return
      }

      // Clear the local storage if the data is not cached
      localStorage.clear()

      try {
        // Makes an asynchronous request to the NASA API
        const response = await fetch(url)

        // If the response succeeds, parse the JSON data
        const apiData = await response.json()

        // Store the data in local storage with the unique key
        localStorage.setItem(localKey, JSON.stringify(apiData))

        // Set the data state to the fetched data
        setData(apiData)
      } catch(err) { // If the request fails, log the error message
        console.log(err.message)
      }
    }

    // Call the fetchData function
    fetchData()
  }, [])

  return (
    <>
      {data ? (<Main data={data} />): (
        <div className='loadingState '>
          <i className="fa-solid fa-gear"></i>
          <h2>Loading...</h2>
        </div>
      )}
      {showModal && (
        <Sidebar data={data} handleDisplayModal={handleDisplayModal}/>
      )}
      {data && (
        <Footer data={data}  handleDisplayModal={handleDisplayModal}/>
      )}
    </>
  )
}

export default App