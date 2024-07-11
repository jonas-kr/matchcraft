import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { login } from '../controllers/userController'
import { UserContext } from '../context/UserContext'

const Login = () => {
    document.title = "Login"

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [mdp, setMdp] = useState()
    const [error, setError] = useState()

    const { setUser } = useContext(UserContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setError(null)
           await login(email, mdp)
            const obj = {
                email: `${localStorage.getItem('email')}`,
                nom: `${localStorage.getItem('nom')}`,
                prenom: `${localStorage.getItem('prenom')}`,
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
                <div className='flexCenter flex-col p-10 w-[450px] shadow-2xl rounded-lg '>
                    {error && <span className='px-4 py-2 bg-red-500 text-white'>{error}</span>}

                    <h2>
                        Se connecter
                    </h2>
                    <form className=' mt-4 w-full'>
                        <input className='input' placeholder='E-Mail' type="mail"
                            value={email} onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <input className='input' placeholder='Password' type="password"
                            value={mdp} onChange={(e) => { setMdp(e.target.value) }}
                        />
                        <p className='text-center pb-6'>mot de passe oublié?</p>
                        <input className='btn font-bold cursor-pointer' type="button" value="Se connecter"
                            onClick={handleLogin}
                        />
                        <p className='text-center py-6'> Vous n’avez pas de compte ? <Link to='/register'><span className='font-bold'>S'inscrire </span></Link> </p>
                    </form>

                </div>
            </section>



        </>
    )
}

export default Login
