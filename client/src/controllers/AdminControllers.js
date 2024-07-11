const getStadium = async (terrain) => {
    const res = await fetch(`http://localhost:5400/admin/stadium/${terrain}`, {
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
const handleAdd = async ( nom, prix, type, ground, covered, image ,location) => {
    if (!nom || !prix || !type || !ground || !image || !location) {
        throw Error('All fields are required')
    }
    const info = JSON.stringify({  nom, prix, type, ground, covered, image,location })

    const res = await fetch(`http://localhost:5400/admin/new`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.message)
    }
    return data
}


export {getStadium,handleAdd}