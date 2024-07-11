import React, { useEffect, useState } from 'react'
import { getStadium } from '../controllers/AdminControllers'
import { Link } from 'react-router-dom'

const ReservationCard = ({ props }) => {
  const [stadium, setStadium] = useState()

  const HandleStadium = async () => {
    const terrain = props.terrain
    try {
      const res = await getStadium(terrain)
      setStadium(res)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setTimeout(async () => {
      await HandleStadium()
    }, 100);
  }, [])

  return (
    <div className='flex flex-col gap-1 w-full p-4 bg-[#EDEEED] rounded-lg'>
      <Link to={`/reservation/${props.terrain}`}>
        <h2>{stadium && stadium.nom}</h2>
      </Link>
      <span className='flexCenter text-xl font-semibold'>{stadium && stadium.type}</span>
      <div className='flexCenter w-full'>
        <div className='w-1/4 flex gap-1'>
          Debut
          <span>{props.horaire}</span>
        </div>
        <div className="flexBetween w-full bg-[#C1C8C1] p-2 rounded-md mt-1">
          60Min
          <span>Prix : {props.price}</span>
        </div>
      </div>
    </div>
  )
}

export default ReservationCard