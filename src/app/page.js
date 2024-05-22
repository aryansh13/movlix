

import MovieList from "@/app/components/MovieList";

const Home = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
  const movie = await response.json()

  return (
    <>
    <h1>Paling Populer</h1>
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
    {movie.results.map(results => {
      return (
        <div key={results.id} className="shadow-xl">
          <MovieList title= {results.title} 
          images = {`${process.env.NEXT_PUBLIC_IMG_URL}/${results.poster_path}`}
          id = {results.id}/>
        </div>
      )
    })}
    </div>
  </>
  )
}

export default Home
