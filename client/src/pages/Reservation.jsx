import React, { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createCollation, createPrestation, createReservation } from '../controllers/ReservationController'
import { getStadium } from '../controllers/AdminControllers'
import { ContactSupportOutlined } from '@mui/icons-material'
import { getRes } from '../controllers/userController'


const Reservation = () => {
    const { terrain } = useParams()

    const [stadium, setStadium] = useState()

    const [date, setDate] = useState()
    const [horaire, setHoraire] = useState()
    const [total, setTotal] = useState()

    //collations
    const [pommes, setPommes] = useState("0")
    const [bananas, setBananas] = useState("0")
    const [biscuits, setBiscuits] = useState("0")

    const [jusN, setJusN] = useState("0")
    const [energyD, setEnergyD] = useState("0")
    const [water, setWater] = useState("0")

    //Prestations
    const [arbitre, setArbitre] = useState()
    const [medcin, setMedcin] = useState()
    const [photograph, setPhotograph] = useState()

    const [success, setSuccess] = useState(null)
    const [err, setErr] = useState(null)

    const navigate = useNavigate()

    const handleRes = async () => {
        const id = localStorage.getItem("id")
        try {
            const res = await getRes(id)
            console.log(res.length);
            if ((res.length + 1) % 6 === 0) {
                setTotal(0)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const HandleStadium = async () => {
        try {
            const res = await getStadium(terrain)
            setTotal(parseInt(res.prix))
            setStadium(res)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleReservation = async () => {
        setErr(null)
        setSuccess(null)
        const inputDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        try {
            if ((inputDate.getTime() < today.getTime())) {
                throw Error("select a date superior to today")
            }
            const collation = await createCollation(water, energyD, jusN, pommes, bananas, biscuits)
            const prestation = await createPrestation(arbitre, medcin, photograph)
            const reservation = await createReservation(terrain, collation, prestation, date, horaire, total)
            console.log({ collation, prestation, message: reservation.message });
            setSuccess(reservation.message)
            navigate('/dash')
        } catch (error) {
            setErr(error.message)
            console.log(error.message);
        }

    }
    useEffect(() => {
        setTimeout(async () => {
            await HandleStadium()
            await handleRes()
        }, 100);
    }, [terrain])

    return (
        <>
            <section className='flex'>
                <Aside />
                <section className='w-[80%] py-2 px-8 '>
                    <section className='flex items-end  gap-10 mb-10'>
                        <div className=' w-[45%]'>
                            <Link to="/">                            <button className='btn bg-[#19A18A] w-[70%] font-semibold mb-4 flex items-center gap-4'>
                                <img className='w-[28px] h-[25px] rounded-xl' src="/arrow.png" alt="" />
                                Return to stadium selection</button></Link>
                            <img className=' w-full h-[220px] rounded-md' src={stadium && stadium.image} alt="" />
                        </div>

                        <div className=' w-[55%] rounded-lg px-4 pb-4 flex flex-col     bg-[#B9D3B9]'>
                            <h1 className='text-center py-4 text-green-900'>{stadium && stadium.nom}</h1>
                            <h3 className='px-8 py-4 mb-4 rounded-md flex  items-center gap-2 bg-gray-200 '>
                                <img className='w-[30px] h-[30px]' src="/location.png" alt="" />
                                {stadium && stadium.location}
                            </h3>
                            <div className='flexBetween gap-8 w-full '>
                                <div className='w-full '>
                                    <p className='p-2 flex items-center gap-4 mb-2 bg-gray-200 rounded-md'>
                                        <img className='w-[30px] h-[30px] ' src="/area.png" alt="" />
                                        40 X 20<span className='font-bold'>m²</span>
                                    </p>
                                    <p className='p-2 bg-gray-200 flex items-center gap-4 rounded-md'>
                                        <img className='w-[30px] h-[30px] rounded-md' src="/grass.jpg" alt="" />
                                        {stadium && stadium.ground}
                                    </p>
                                </div>
                                <div className='w-full '>
                                    <p className='p-2 flex items-center gap-4 mb-2 bg-gray-200 rounded-md'>
                                        <img className='w-[30px] h-[30px] rounded-md' src="/type.jpg" alt="" />
                                        {stadium && <>{stadium.covered ? <>Covered</> : <>Not Covered</>}</>}
                                    </p>
                                    <p className='p-1 bg-gray-200 rounded-md flex items-center gap-2'>
                                        <img className='w-[40px] h-[40px] ' src="/price.png" alt="" />
                                        {stadium && stadium.prix}
                                        <span className='font-bold'>DA/Hr</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>



                    <section className=' bg-[#B9D3B9] rounded-lg px-8 flex flex-col items-center'>
                        {err && <span className='mx-auto bg-red-500 px-4 py-2'>{err}</span>}
                        {success && <span className='mx-auto bg-green-500 px-4 py-2'>{success}</span>}
                        <h2 className=' text-green-900 text-4xl text-center py-8'>Reservation du Terrain</h2>
                        <div className='w-full flex items-center justify-center gap-8  mb-8'>
                            <p className='text-3xl font-bold w-[20%] '>Date : </p>
                            <input className='input m-0 w-[60%] font-semibold border-[2px] border-[#19A18A] bg-white  '
                                type="date" value={date} onChange={(e) => {
                                    setDate(e.target.value)
                                }} />
                            <select className='w-[20%] px-4 py-2' value={horaire} onChange={(e) => {
                                setHoraire(e.target.value)
                            }}>
                                <option value="08:00">08:00</option>
                                <option value="09:00">09:00</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                                <option value="18:00">18:00</option>
                                <option value="19:00">19:00</option>
                                <option value="20:00">20:00</option>
                                <option value="21:00">21:00</option>
                                <option value="22:00">22:00</option>
                            </select>
                            {/*                       <input className='input w-[15%] font-semibold border-[2px] border-[#19A18A] bg-white  '
                                type="time" 
                            /> */}
                        </div>

                        <div className='flex justify-around  gap-8 h-[300px] w-full '>
                            <form className=' w-[60%]  flex flex-col items-center rounded-md bg-gray-200 p-4'>
                                <h2 className='text-center  text-green-900 pt-2 pb-6'>Choix De Collations</h2>
                                <div className='flexCenter gap-8 rounded-md w-full'>
                                    <div className='bg-[#B9D3B9] rounded-md px-4 py-2 w-[50%]' >
                                        <h3 className='text-center font-bold p-2'>Boissons</h3>
                                        <div className='flex items-center gap-4  rounded-md p-2'>
                                            <p>Eau Minirale </p>

                                            <input className=' w-[65px] p-1 bg-[#B9D3B9] ' type="number" placeholder='0' min='0'
                                                value={water} onChange={(e) => {
                                                    setWater(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className='flex items-center gap-4  rounded-md p-2'>
                                            <p>Jus Nature </p>

                                            <input className=' w-[65px] p-1 bg-[#B9D3B9] ' type="number" placeholder='0' min='0'
                                                value={jusN} onChange={(e) => { setJusN(e.target.value) }}
                                            />
                                        </div>
                                        <div className='flex gap-4 items-center rounded-md p-2'>
                                            <p>B.Energitique </p>

                                            <input className=' w-[65px] p-1 bg-[#B9D3B9] ' type="number" placeholder='0' min='0'
                                                value={energyD} onChange={(e) => { setEnergyD(e.target.value) }} />
                                        </div>
                                    </div>

                                    <div className='bg-[#B9D3B9] w-[50%] rounded-md px-4 py-2 '>
                                        <h3 className='text-center font-bold p-2'>Autres</h3>
                                        <div className='flex items-center gap-4  rounded-md p-2'>
                                            <p>Pommes</p>
                                            <input className=' w-[65px] p-1 bg-[#B9D3B9] ' type="number" placeholder='0' min='0'
                                                value={pommes} onChange={(e) => { setPommes(e.target.value) }} />
                                        </div>

                                        <div className='flex items-center gap-4  rounded-md p-2'>
                                            <p>Banana</p>
                                            <input className=' w-[65px] p-1 bg-[#B9D3B9] ' type="number" placeholder='0' min='0'
                                                value={bananas} onChange={(e) => { setBananas(e.target.value) }} />
                                        </div>

                                        <div className='flex items-center gap-4  rounded-md p-2'>
                                            <p>Biscuits</p>
                                            <input className=' w-[65px] p-1 bg-[#B9D3B9] ' type="number" placeholder='0' min='0'
                                                value={biscuits} onChange={(e) => { setBiscuits(e.target.value) }} />
                                        </div>
                                    </div>
                                </div>


                            </form>

                            <form className=' w-[40%]  flex flex-col items-center rounded-md bg-gray-200 px-8 py-4 '>
                                <h2 className='text-center  text-green-900  pt-2 pb-5' >Prestations</h2>

                                <div className='bg-[#B9D3B9] rounded-md w-full px-4 py-2  '>
                                    <h3 className='text-center font-bold py-2'>Voullez-vous des </h3>
                                    <div className='flex gap-2  p-2'>
                                        <p>Arbitres ?</p>
                                        <input className=' w-[65px] p-1 bg-[#B9D3B9] ' type='checkbox'
                                            value={arbitre} onChange={(e) => {
                                                setArbitre(e.target.checked)
                                                if (e.target.checked) {
                                                    setTotal(total + 1000)
                                                } else {
                                                    setTotal(total - 1000)
                                                }
                                            }} />
                                    </div>
                                    <div className='flex gap-2 bg-[#B9D3B9] rounded-md p-2'>
                                        <p>Medcins ?</p>
                                        <input className=' w-[65px] p-1 bg-[#B9D3B9] ' type="checkbox"
                                            value={medcin} onChange={(e) => {
                                                setMedcin(e.target.checked)
                                                if (e.target.checked) {
                                                    setTotal(total + 1000)
                                                } else {
                                                    setTotal(total - 1000)
                                                }
                                            }} />
                                    </div>
                                    <div className='flex gap-2 bg-[#B9D3B9] rounded-md p-2'>
                                        <p>Photographe ?</p>
                                        <input className=' w-[65px] p-1 bg-[#B9D3B9] ' type="checkbox"
                                            value={photograph} onChange={(e) => {
                                                setPhotograph(e.target.checked)
                                                if (e.target.checked) {
                                                    setTotal(total + 1000)
                                                } else {
                                                    setTotal(total - 1000)
                                                }
                                            }} />
                                    </div>
                                </div>


                            </form>
                        </div>

                        <div className='flexEnd gap-6 p-6 w-full'>
                            <p className='font-bold bg-white border-[2px] border-[#19A18A] p-2 rounded-md'>Tot :<span > {total}</span>DA</p>
                            <button className='btn font-bold w-[27%] border-[2px] bg-[#19A18A] border-[#19A18A] '
                                onClick={handleReservation}
                            >Valider</button>
                        </div>



                    </section>



                </section>


            </section>

        </>
    )
}

export default Reservation
