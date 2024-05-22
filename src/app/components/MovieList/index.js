import Image from 'next/image'
import Link from 'next/link'
const MovieList = ({title, images, id}) => {
    return (
            <Link href={`/${id}`} className="cursor-pointer">
                <Image src={images} 
                alt="..." width={600} height={600}/>
                <h3 className='font-bold md:text-xl text-md p-4'>{title}</h3>
            </Link>
            )
}

export default MovieList