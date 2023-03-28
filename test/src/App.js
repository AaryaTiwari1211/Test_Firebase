import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

function App() {
  const [movies, setMovies] = useState([])
  const [newMovie, setNewMovie] = useState('')
  const [newDate, setNewDate] = useState(0)
  const [newOscar, setNewOscar] = useState(false)
  const [updatetitle, setUpdatedTitle] = useState('')
  const [file, setFile] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);


  const moviecollection = collection(db, "Movies")

  const handleSumbitMovie = async () => {
    try {
      await addDoc(moviecollection, { title: newMovie, date: newDate, oscar: newOscar, userId: auth?.currentUser?.uid })
      getMovies();
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleDeleteMovie = async (id) => {
    try {
      const movie = doc(db, "Movies", id)
      await deleteDoc(movie)
      getMovies();
    }
    catch (err) {
      console.log(err)
    }

  }
  const handleFileUpload = async () => {
    try {
      if (!file) {
        return;
      }
      else {
        const fileFolderef = ref(storage, `projectFiles/${file.name}`)
        await uploadBytes(fileFolderef, file)
      }
    }
    catch (err) {
      console.log(err)
    }

  }
  const handleUpdateMovie = async (id) => {
    const movie = doc(db, "Movies", id)
    await updateDoc(movie, { title: updatetitle })
    getMovies();
  }
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
  const userMovies = movies.filter((movie) => movie.userId === auth?.currentUser?.uid);
  useEffect(() => {
    getMovies();
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  return (
    <div className="App">
      <Auth />
      <div className='form'>
        <div>
        </div>
        <input type='text' value={newMovie} onChange={(event) => setNewMovie(event.target.value)} placeholder='Movie Name' />
        <br />
        <input type='number' value={newDate} onChange={(event) => setNewDate(event.target.value)} placeholder='Date' />
        <br />
        <input type='checkbox' checked={newOscar} onChange={(event) => setNewOscar(event.target.checked)} />
        <label>Recieved an Oscar??</label>
        <br />
        <button type='submit' onClick={handleSumbitMovie}>Add a Movie</button>
      </div>
      <div className='form'>
        {
          userMovies.map((movie) => (
            <div key={movie.id}>
              <h1>
                {movie.title}
              </h1>
              <br />
              <h3>
                Created by -- {movie.userId}
              </h3>
              <p>
                Date: {movie.date}
              </p>
              <h6>
                {movie.oscar ? 'YES' : 'NO'}
              </h6>
              <button type='submit' onClick={() => handleDeleteMovie(movie.id)}>Delete Movie</button>
              <br />
              <input onChange={(event) => setUpdatedTitle(event.target.value)} placeholder='New Movie Title' />
              <button type='submit' onClick={() => handleUpdateMovie(movie.id)}>Update Movie</button>
            </div>
          ))
        }
      </div>
      <div className='form'>
        <input type='file' onChange={(event) => setFile(event.target.files[0])} />
        <button onClick={handleFileUpload}>Upload Files</button>
      </div>
    </div>
  );
}

export default App;
