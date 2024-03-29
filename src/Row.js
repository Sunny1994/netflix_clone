import instance from './axios'
import { useEffect, useState } from 'react'
import './Row.css'

function Row({title, fetchUrl, isLargeRow=false}){

    const [movies, setMovies]=useState([])

    const base_url='https://image.tmdb.org/t/p/original/'

    useEffect(()=>{
    
        async function fetchData(){
            const request= await instance.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()

    },[fetchUrl])

    return(
        <div className='row'>
            <h2>{title}</h2>
        
        <div className='row_posters'>
            {movies.map(movie=>(

                (isLargeRow && movie.poster_path)||(!isLargeRow && movie.backdrop_path)) && (
                    <img className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                    src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                    key={movie.id}
                    alt={movie.title}/>
                
             
            ))}
           </div>
        </div>
    )

}

export default Row