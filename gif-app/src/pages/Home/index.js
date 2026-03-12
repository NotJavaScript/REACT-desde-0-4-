import ListOfGifs from "components/ListOfGifs/ListOfGifs";
import { useGifs } from "hooks/useGif";
import {Helmet} from 'react-helmet'
import TrendingSearches from "components/TrendingSearches"
import SearchForm from "components/SearchForm";

export default function Home() {
  const {gifs} = useGifs()

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <header className="o-header">
        <SearchForm></SearchForm>
      </header>
      <div className="App-wrapper">
        <div className="App-main">
          <div className="App-results">
            <h3 className="App-title">Última búsqueda</h3>
            <ListOfGifs gifs={gifs} />
          </div>
          <div className="App-category">
            <TrendingSearches/>
          </div>
        </div>
      </div>
    </>
  )
}