import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore'

function App() {
  const [movies, setMovies] = useState([])

  const moviecollection = collection(db, "Movies")
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getDocs(moviecollection)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        console.log(filteredData)
        setMovies(filteredData)
      }
      catch (err) {
        console.log(err)
      }
    }
    getMovies();
  }, [])
  return (
    <div className="App">
      <Auth />
      <div className='form'>
        {
          movies.map((movie) => (
            <div key={movie.id}>
              <h1>
                {movie.title}
              </h1>
              <p>
                Date: {movie.date}
              </p>
              <h6>
                {movie.oscar ? 'YES' : 'NO'}
              </h6> 
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
