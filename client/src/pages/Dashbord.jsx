import { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import { getProfile, getRes } from '../controllers/userController'





const Dashbord = () => {
    const [user, setUser] = useState()
    const [show, setShow] = useState(false)
    const [reservations,setReservations] = useState()

    const handleProfile = async () => {
        try {
            const data = await getProfile()
            console.log(data);
            await handleRes(data._id)
            setUser(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleRes = async (id) => {
        
        try {
            const res = await getRes(id)
            setReservations(res.length)
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        setTimeout(async () => {
            await handleProfile()
        }, 100);
    }, [])
    return (
        <>
            <section className='flex'>

                <Aside />

                <section className=' flex flex-col items-center p-20 relative w-[77%]'>
                    <p className=' p-3 text-center bg-gray-300 rounded-md 
                     absolute right-4 top-3 '> Reservation : <span> {reservations && reservations}</span> </p>

                    <div className=' px-16 py-6 rounded-md w-[90%] bg-[#B9D3B9]'>
                        <h3 className='text-center text-2xl font-semibold pb-8'>
                            INFORMATIONS PERSONNELES</h3>

                        <div className='flexBetween gap-8'>
                            <p className='p-2 w-[50%] rounded-md bg-[#EDEDED] flex items-center gap-2'>
                                <img className='w-[30px] h-[30px]' src="Male User.png" alt="" />
                                {user && user.nom}
                            </p>
                            <p className='p-2 w-[50%] rounded-md bg-[#EDEDED] flex items-center gap-2'>
                                <img className='w-[30px] h-[30px]' src="Male User.png" alt="" />
                                {user && user.prenom}
                            </p>
                        </div>
                        <p className='p-2 my-5 rounded-md bg-[#EDEDED] flex items-center gap-2'>
                            <img className='w-[30px] h-[30px]' src="/Call.png" alt="" />
                            {user && user.numTel}
                        </p>
                        <p className='p-2 my-5 rounded-md bg-[#EDEDED] flex items-center gap-2'>
                            <img className='w-[30px] h-[30px]' src="Male User.png" alt="" />
                            {user && user.adress}
                        </p>
                        <p className='p-2 my-5 rounded-md bg-[#EDEDED] flex items-center gap-2'>
                            <img className='w-[30px] h-[30px]' src="Email.png" alt="" />
                            {user && user.email}
                        </p>
                        <p className='p-2 my-5 rounded-md bg-[#EDEDED]  flexBetween '>
                            <span className='flex items-center gap-2'>
                                <img className='w-[30px] h-[30px]' src="Lock.png" alt="" />

                                {user && <>{show ? user.mdp : "**********"}

                                </>}
                            </span>
                            <img className='w-[25px] h-[25px] cursor-pointer' src="Eye.png" onClick={() => { setShow(!show) }} />
                        </p>
                    </div>

                    <form className='p-4 m-8 border-[2px] border-black w-[90%] rounded-md  flex items-end justify-end gap-6 '>
                        <div className='w-[80%]'>
                            <p className='pb-2'>Modifier mot de passe</p>
                            <input className='input m-0 bg-[#EDEDED] w-full' type="password" placeholder='798456123' />
                            <p className='p-2'>Confirmer le nouveau mot de passe</p>
                            <input className='input m-0 bg-[#EDEDED] w-full' type="password" placeholder='798456123' />
                        </div>
                        <input className='btn w-[20%] rounded-lg' value='valider' type="button" />
                    </form>

                </section>
            </section>
        </>
    )
}

export default Dashbord