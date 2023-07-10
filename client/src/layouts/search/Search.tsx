import './Search.scss'

import SearchField from '../../components/searchField/SearchField'
import { useState } from 'react'
import { getEngineResults } from '../../service/liquorApi'
import { useLiquorApi } from '../../service/hooks/useLiquorApi'
import { OneResult } from '../../components/oneResult/OneResult'
import { Recommendations } from '../../components/recommendations/Recommendations'
import { TEngineResults } from '../../service/types'
function Search() {

  const [selected, setSelected] = useState('')

  const { data, isLoading } = useLiquorApi<TEngineResults>(['engine', selected], getEngineResults)

  console.log(data)
  return (
    <div className='search__container'>

      <SearchField handleSelect={setSelected} />

      {data && !isLoading ?
        <>
          <OneResult {...data} />
          <Recommendations data={data.engine}/>
        </>
        : null}
    </div>
  )
}

export default Search