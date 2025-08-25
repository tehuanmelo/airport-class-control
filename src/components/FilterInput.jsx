import { useState } from 'react'

function FilterInput({data, setFilterData, label}) {
  const [filterText, setFilterText] = useState("")

  return (
    <label className='flex items-center gap-2 p-2'>
        {label}
        <input type="text" placeholder='Search by location or date...' 
        value={filterText}
        onChange={e => {
          const text = e.target.value.toLowerCase()
          setFilterText(text)

          let filtered = data.filter(item => {
            const location = item.location.toLowerCase()
            const date = new Date(item.date).toLocaleDateString()
            console.log(date);
            if (location.includes(text) || date.includes(text)) {
              return item
            }
          })

          if (text.trim() === "") filtered = data
          setFilterData(filtered)
        }}
        className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
        />
    </label>
  )
}

export default FilterInput