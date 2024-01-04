import './Homescreen.css'
import Nav from '../Nav'
import Banner from '../Banner'
import requests from '../request'
import Row from '../Row'

function Homescreen(){

    return( 

        <div className="homescreen">
            <Nav/>
            <Banner/>
            <Row title='Trending Now' fetchUrl={requests.fetchTrending}isLargeRow={true}/>
            <Row title='Netflix Originals' fetchUrl={requests.fetchDocumentaries}/>
            <Row title='Top Rated' fetchUrl={requests.fetchTopRated}/>
            <Row title='Action Movies' fetchUrl={requests.fetchRomanceMovies}/>
            <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies}/>
            <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies}/>
            <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies}/>
            

        </div>
    )


}

export default Homescreen