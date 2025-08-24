

export const URL = "https://script.google.com/macros/s/AKfycbyspyIgE57DwoAw_LxKPRC1I3Ne6rjQhIEaiD6ge1ZdEmOkz0h5Rr7sq8Gmhz_mNFy_Fg/exec"




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
        const response = await fetch(`${URL}?data=users`)
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