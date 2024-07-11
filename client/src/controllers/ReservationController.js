const createCollation = async (water, energyD, jusN, pommes, bananas, biscuits) => {
    if (!water || !bananas || !energyD || !jusN || !biscuits || !pommes) {
        throw Error("Fields must be filled")
    }
    const info = JSON.stringify({ water, energyD, jusN, pommes, bananas, biscuits })
    const res = await fetch('http://localhost:5400/users/collation', {
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
    return data._id
}
const createPrestation = async (arbitre, medcin, photograph) => {
    const info = JSON.stringify({ arbitre, medcin, photograph })
    const res = await fetch('http://localhost:5400/users/prestation', {
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
    return data._id
}
const createReservation = async (terrain,collation,prestation,date,horaire,total) => {
    if (!terrain || !collation || !prestation || !date || !horaire || !total) {
        throw Error("Fields must be filled")
    }
    const info = JSON.stringify({ terrain,collation,prestation,date,horaire, price:total })
    const res = await fetch('http://localhost:5400/users/reserver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.message)
    }
    return data
}
export { createCollation, createPrestation ,createReservation}