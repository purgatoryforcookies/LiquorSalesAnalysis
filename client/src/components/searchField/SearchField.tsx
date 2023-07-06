import './SearchField.scss'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../service/hooks/useDebounce'
import { getSearchResults } from '../../service/liquorApi'
import { TLiquor } from '../../service/types'
import { useClickWatcher } from '../../service/hooks/useClickWatcher'
import { useLiquorApi } from '../../service/hooks/useLiquorApi'

function SearchField({ handleSelect }: any) {

    const [search, setSearch] = useState('')
    const [selectionMemory, setSelectionMemory] = useState('')
    const [errorMes, setErrorMes] = useState('')
    const ref = useRef(null)
    const debouncedKeyword = useDebounce(search, 300)


    const { data, isError, error, isLoading } = useLiquorApi(
        ['search', debouncedKeyword], getSearchResults)

    useClickWatcher<string>(ref, '', setSearch)

    const selectionHandler = (item: TLiquor) => {
        handleSelect(item._id)
        setSelectionMemory(item.fields.name[0])
        setSearch('')
    }

    useEffect(() => {
        if (isError) {
            // @ts-ignore
            setErrorMes(error?.response?.data)
        }
    }, [isError])




    return (
        <div className='searchField__container' ref={ref}>

            <form action="">
                <input type="text" placeholder='Search...' onFocus={() => setSearch(selectionMemory)}
                    value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>

            <div className={search != '' ? 'searchField__results' : "searchField__results closed"}>
                <ul>

                    {isError && !isLoading ? <li>{errorMes}</li> : null}
                    {!isError && !isLoading ? data?.map(item => (
                        <li key={item._id} onClick={() => selectionHandler(item)}>
                            <p id='liters'>{item.fields.vol_ml[0] / 1000}L</p>
                            <p>{item.fields.name[0]}</p>
                        </li>
                    )) : null}
                </ul>
            </div>

        </div>
    )
}

export default SearchField