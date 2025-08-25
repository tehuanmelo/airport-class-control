

export const URL = import.meta.env.VITE_SECRET_KEY



export async function getData() {
    try {
        const response = await fetch(`${URL}?data=data`)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(`Error fetching data: ${error}`)
    }
}

export async function getUsers() {
    try {
        const response = await fetch(`${URL}?data=coaches`)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(`Error fetching data: ${error}`)
    }
}
export async function getLocations() {
    try {
        const response = await fetch(`${URL}?data=locations`)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(`Error fetching data: ${error}`)
    }
}