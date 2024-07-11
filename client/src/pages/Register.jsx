import React, { useContext, useState } from 'react'
import { register } from '../controllers/userController'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { UserContext } from '../context/UserContext'


const Register = () => {
  document.title = "Register"
  const [nom, setNom] = useState()
  const [prenom, setPrenom] = useState()
  const [numTel, setNumTel] = useState()
  const [adress, setAdress] = useState()
  const [email, setEmail] = useState()
  const [mdp, setMdp] = useState()
  const [mdpC, setMdpC] = useState()
  const [error, setError] = useState()

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)
    if (mdp != mdpC) {
      return setError("Passwords Doesnt match")
    }
    try {
      await register(nom, prenom, numTel, email, mdp,adress)
      const obj = {
        email: `${localStorage.getItem('email')}`,
        nom: `${localStorage.getItem('nom')}`,
        prenom: `${localStorage.getItem('prenom')}`
      }
      setUser(obj)
      navigate('/dash')

    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <Header />
      <section className='flexCenter py-10 px-20'>
        <div className='flexCenter flex-col px-10 pb-10 w-[450px] shadow-2xl rounded-lg '>
          {error && <span className='px-4 py-2 bg-red-500 text-white'>{error}</span>}
          <h2 className='p-4'>
            S’inscrire
          </h2>
          <form className=' mt-4 w-full'>
            <div className='flexCenter gap-4'>
              <input className='input  ' placeholder='Nom' type="text"
                value={nom} onChange={(e) => { setNom(e.target.value) }}
              />
              <input className='input' placeholder='Prenom' type="text"
                value={prenom} onChange={(e) => { setPrenom(e.target.value) }}

              />
            </div>
            <input className='input' placeholder='Telephone' type="text"
              value={numTel} onChange={(e) => { setNumTel(e.target.value) }}

            />
            <input className='input' placeholder='Address "wilaya,commune"' type="text"
              value={adress} onChange={(e) => { setAdress(e.target.value) }}

            />
            <input className='input' placeholder='E-mail' type="email"
              value={email} onChange={(e) => { setEmail(e.target.value) }}

            />
            <input className='input' placeholder='Mot de passe' type="password"
              value={mdp} onChange={(e) => { setMdp(e.target.value) }}

            />
            <input className='input' placeholder='Confirmation de mot de passe' type="password"
              value={mdpC} onChange={(e) => { setMdpC(e.target.value) }}

            />
            <input className='btn text-md font-bold mt-10 cursor-pointer' type="button"
              value="S’inscrire" onClick={handleRegister} />
          </form>
        </div>
      </section>

    </>
  )
}

export default Register
