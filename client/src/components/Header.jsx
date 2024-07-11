import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

function Header() {
    const { user,setUser } = useContext(UserContext)
    let content = <></>
    if (user) {
       content =  <div className='flex items-center gap-4'>  

           <Link className='flex items-center gap-4' to="/dash"> <h3 className='text-black text-xl font-bold font-poppins'>{user.nom} {user.prenom}</h3>
            <img className='w-[40px]' src="/profile.png" alt="profile pic" /></Link>
           <span className='font-bold cursor-pointer bg-[#2B3044] py-2 px-4 rounded-md' 
            onClick={()=>{
                setUser(null)
                localStorage.clear()
            }}
            >Se deconnecter</span>
        </div>
    }else if(!user) {
        content =  <nav className='flex'>
        <ul className="flex gap-[20px]">

            <Link to="/login"><li className='btn w-36 text-lg font-bold text-black text-center bg-transparent border-black border-[2px]'>Se conncter</li></Link>
            <Link to="/register"><li className='btn w-36 text-lg font-semibold text-center border-[#2B3044] border-[2px] bg-[#2B3044] '>S'inscrire</li></Link>
        </ul>
    </nav>
    }
    return (
        <header className=''>
            <section className="flexBetween px-[30px] bg-gray-300  h-[75px]
         md:px-[80px] text-white">
                <Link to="/">
                    <img className=' h-[60px]' src="/logo.png" alt="MATCH CRAFT" />
                </Link>
                {content}
            </section>


            <section className='hidden justify-between items-center py-3 px-20 bg-[#B9D3B9]'>
                <nav>
                    <ul className='flex gap-12 text-lg font-bold'>
                        <Link><li>Accueil</li></Link>
                        <Link><li>Terrains</li></Link>
                        <Link><li>Prestations</li></Link>
                        <Link><li>Reservations</li></Link>
                        <Link><li>Profil</li></Link>
                    </ul>

                </nav>
                <input type="button" value="Se deconnecter" className='btn  w-40  text-lg font-semibold text-center border-[#2B3044]
                     border-[2px] bg-[#2B3044]'/>
            </section>

        </header>
    )
}

export default Header