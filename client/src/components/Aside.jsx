import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const nav = [
    {
        name: 'ACCEUIL',
        link: '/'
    }, {
        name: 'RESERVERATIONS',
        link: '/reservations'
    }, {
        name: 'DASHBORD',
        link: '/dash'
    }, {
        name: 'TERRAINS',
        link: '/'
    }
]



const Aside = () => {
    const { user,setUser } = useContext(UserContext)

    return (
        <>
            <section className='py-8 flex flex-col items-center gap-12 bg-[#19A18A] w-[23%]'>
                <div className='flex flex-col items-center gap-4 text-white border-b-[2px] w-full'>
                    <img className='rounded-[50px] w-[140px] h-[140px]' src="/animegirl.webp" alt="" />
                    <h2 className='text-white'>{user && user.nom} {user && user.prenom}</h2>
                </div>

                <nav className='py-6 w-full'>
                    <ul className='text-lg text-center font-bold text-white border-y-[1px]'>
                        {nav.map((n) => {
                            return <Link to={n.link}><li className='py-1 text-white border-y-[1px]'>{n.name}</li></Link>
                        }
                        )}
                    </ul>
                </nav>
            </section>
        </>
    )
}

export default Aside
