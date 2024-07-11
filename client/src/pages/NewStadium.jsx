import { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import { handleAdd } from '../controllers/AdminControllers'
import { useNavigate } from 'react-router-dom'

const NewStadium = () => {
    const [nom, setNom] = useState()
    const [type, setType] = useState()
    const [prix, setPrix] = useState(2500)
    const [location, setLocation] = useState()
    const [covered, setCovered] = useState(false)
    const [ground, setGround] = useState()
    const [image, setImage] = useState()
    
const navigate = useNavigate()
    const addStadium = async (e) => {
        e.preventDefault()
        try {
            const res = await handleAdd(nom, prix, type, ground, covered, image, location)
            console.log(res);
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <section className='flexCenter'>
            <div className='flexCenter flex-col w-[77%] py-8'>
                <h2 className='text-4xl mb-4'>Add New Stadium</h2>
                <div className='w-[80%] p-8 bg-[#B9D3B9] rounded-lg'>
                    <form className='flex flex-col'>
                        <label>Nom de Stade</label>
                        <input className='input bg-[#D9D9D9]'
                            value={nom} onChange={(e) => { setNom(e.target.value) }}
                            type="text" />
                        <label>Type</label>
                        <select className='input bg-[#D9D9D9]'
              value={type} onChange={(e) => { setType(e.target.value) }}
                        >
                            <option value="football">football</option>
                            <option value="basketball">basketball</option>
                            <option value="handball">handball</option>

                        </select>

                        <label>Prix</label>
                        <input className='input bg-[#D9D9D9]' type="number" min={2500}
                            value={prix} onChange={(e) => { setPrix(e.target.value) }}

                        />
                        <label>Adresse</label>
                        <input className='input bg-[#D9D9D9]' type="text"
                            value={location} onChange={(e) => { setLocation(e.target.value) }}

                        />
                        <label>Couvert</label>
                        <input className='input bg-[#D9D9D9]' type="checkBox"
                            value={covered} onChange={(e) => { setCovered(e.target.checked) }}

                        />
                        <label>Gazon</label>
                        <select className='input bg-[#D9D9D9]' value={ground} onChange={(e) => { setGround(e.target.value) }}
                        >
                            <option value="Artificielle">Artificielle</option>
                            <option value="Naturel">Naturel</option>
                        </select>
                        <label>Image</label>
                        <input className='input bg-[#D9D9D9]' type="text" placeholder='Url'
                            value={image} onChange={(e) => { setImage(e.target.value) }}
                        />
                        <button className='btn mt-4' onClick={(e) => {
                            e.preventDefault()
                            addStadium(e)
                        }}>Add Stadium</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default NewStadium