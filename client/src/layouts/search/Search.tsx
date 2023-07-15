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

  return (
    <div className='search__container'>
      <div className="left">

        <SearchField handleSelect={setSelected} />
      </div>
      <div className="right">
        {data && !isLoading ?
          <>
            <OneResult {...data} />
            <Recommendations data={data.engine} />
          </>
          : null}

      </div>
    </div>
  )
}

export default Search