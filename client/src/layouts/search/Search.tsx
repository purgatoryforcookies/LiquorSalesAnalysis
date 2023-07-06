import './Search.scss'

import SearchField from '../../components/searchField/SearchField'
import { useState } from 'react'
import { getEngineResults } from '../../service/liquorApi'
import { useLiquorApi } from '../../service/hooks/useLiquorApi'
import { OneResult } from '../../components/oneResult/OneResult'

function Search() {

  const [selected, setSelected] = useState('')
  
  const { data, isError, error, isLoading } = useLiquorApi(['engine', selected], getEngineResults)

  if (isError) {
    //@ts-ignore
    return <div>{error?.response?.data}</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='search__container'>
      
      <SearchField handleSelect={setSelected}/>

      {data && <OneResult {...data?.[0].fields} />}
    </div>
  )
}

export default Search