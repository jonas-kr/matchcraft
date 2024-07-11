function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const register = async (nom, prenom, numTel, email, mdp, adress) => {
    if (!nom || !prenom || !numTel || !email || !mdp || !email || !adress) {
        throw Error('All fields are required')
    }
    if (!isValidEmail(email)) {
        throw Error('Email Not valid')
    }
    let e = email.toLowerCase()

    const info = JSON.stringify({ email: e, nom, prenom, numTel, mdp, adress })

    const res = await fetch('http://localhost:5400/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.message)
    }
    localStorage.setItem('email', data.email)
    localStorage.setItem('token', data.token)
    localStorage.setItem('nom', data.nom)
    localStorage.setItem('prenom', data.prenom)
    localStorage.setItem('id', data.id)


    return data
}

const login = async (email, mdp) => {
    if (!email || !mdp) {
        throw Error('All fields are required')
    }
    let e = email.toLowerCase()
    console.log(e);
    const info = JSON.stringify({ email: e, mdp })
    const res = await fetch('http://localhost:5400/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.message)
    }
    localStorage.setItem('email', data.email)
    localStorage.setItem('token', data.token)
    localStorage.setItem('nom', data.nom)
    localStorage.setItem('prenom', data.prenom)
    localStorage.setItem('id', data.id)

    return data
}

const getProfile = async () => {
    const res = await fetch('http://localhost:5400/users/one', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

            'Authorization': `bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.message)
    }
    return data
}

const getRes = async(id)=>{
        const res = await fetch(`http://localhost:5400/users/reservations/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        if (!res.ok) {
            throw Error(data.message)
        }
        return data
    
}
export { register, login, getProfile,getRes }