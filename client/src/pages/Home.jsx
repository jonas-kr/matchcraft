import LocationCityIcon from '@mui/icons-material/LocationCity';
import Header from "../components/Header"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* const Stadiums = [{
    name: 'Etihad Stadium',
    location: 'Manchester',
    pic: '/etihad.png'
},
{
    name: 'CampNou',
    location: 'Barcelona',
    pic: '/campnou.png'
},
{
    name: 'Bernabiou',
    location: 'Madrid',
    pic: '/bernabiou.png'
},
{
    name: 'Wembly',
    location: 'London',
    pic: '/wembly.png'
},
{
    name: 'CampNou',
    location: 'Barcelona',
    pic: '/campnou.png'
},
{
    name: 'Bernabiou',
    location: 'Madrid',
    pic: '/bernabiou.png'
},
{
    name: 'Wembly',
    location: 'London',
    pic: '/wembly.png'
},
{
    name: 'Etihad Stadium',
    location: 'Manchester',
    pic: '/etihad.png'
}
] */

function Home() {
    document.title = "Home"
    const [stadiums, setStadiums] = useState()
    const handleStadiums = async () => {
        const res = await fetch('http://localhost:5400/admin/stadiums', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                }
        })
        const data = await res.json()
        if (!res.ok) {
            throw Error(data.message)
        }
        setStadiums(data)
        console.log(data);
      }
useEffect(()=>{
    setTimeout(async() => {
        await handleStadiums()
    }, 500);
},[])


    return (
        <>
            <Header />
            <section className='relative bg-black'>
                <img className='w-full' src="/accueil.png" alt="" />
                <h2 className='text-center text-5xl font-extrabold text-white absolute top-[50%] 
                left-[50%] translate-x-[-50%] w-full'>
                    VIVEZ LE SPORT AVEC MATCHCRAFT
                </h2>
            </section>
            <section className='my-10 px-20'>
                <div className='flexBetween'>
                    <h2 className=''>
                        Terrains
                    </h2>
                    <select className='rounded-lg bg-gray-200 outline-none px-3 py-2 text-lg'>
                        <option value="All">All</option>
                        <option value="Football">Football</option>
                        <option value="Handball">Handball</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Tenis">Tenis</option>
                    </select>

                </div>


                <div className='grid grid-cols-4 gap-6'>
                    {stadiums && stadiums.map((s) => {
                        return <Link to={`/reservation/${s._id}`}>
                        <div className='flexCenter flex-col pt-6' key={s._id}>
                            <img className='' src={s.image} />
                            <h3 >{s.nom}</h3>
                            <div className='flex items-center gap-2'>
                                <LocationCityIcon className="fontSize small" />
                                <p>{s.location}</p>
                            </div>
                        </div>
                        </Link>
                    }) }

                </div>

            </section>
        </>
    )
}

export default Home