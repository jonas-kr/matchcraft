import { useEffect, useState } from "react"
import Aside from "../components/Aside"
import ReservationCard from "../components/ReservationCard"
import { getRes } from "../controllers/userController"

const Reservations = () => {
  document.title = "Reservations"
const [reservations,setReservations] = useState()
  const handleRes = async () => {
    const id = localStorage.getItem("id")
         try {
          const res = await getRes(id)
          setReservations(res)
          console.log(res);
        } catch (error) {
          console.log(error.message);
        } 
  }
  useEffect(() => {
    setTimeout(async () => {
      await handleRes()
    }, 500);
  }, [])
  return (
    <section className="flex">
      <Aside />
      <div className='flex items-center flex-col w-[77%] py-8'>
        <h2 className='text-4xl mb-6 mx-auto'>Reservations</h2>
        <div className=" w-[80%] flexCenter flex-col gap-2">
          {reservations && reservations.map((r)=>{
           return <ReservationCard props={r}/>
          })}
        </div>
      </div>
    </section>
  )
}

export default Reservations