import './SearchField.scss'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../service/hooks/useDebounce'
import { getSearchResults } from '../../service/liquorApi'
import { TLiquor } from '../../service/types'
import { useClickWatcher } from '../../service/hooks/useClickWatcher'
import { useLiquorApi } from '../../service/hooks/useLiquorApi'

function SearchField({ handleSelect }: any) {

    const [search, setSearch] = useState('')
    const [errorMes, setErrorMes] = useState<string | undefined>('')
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const debouncedKeyword = useDebounce(search, 300)


    const { data, isError, error, isLoading } = useLiquorApi(
        ['search', debouncedKeyword], getSearchResults)

    useClickWatcher<boolean>(ref, false, setOpen)

    const selectionHandler = (item: TLiquor) => {
        handleSelect(item._id)
        setOpen(false)
        setSearch('')
    }

    useEffect(() => {
        if (isError) {
            setErrorMes(error?.response?.data as string || error?.message)
        }
    }, [isError])

    return (
        <div className='searchField__container' ref={ref}>

            <form action="">
                <input type="text" placeholder='Search...' onFocus={() => setOpen(true)}
                    value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>

            <div className={open ? 'searchField__results' : "searchField__results closed"}>
                <ul>
                    {isLoading ? <li>Loading...</li> : null}
                    {isError && !isLoading ? <li>{errorMes}</li> : null}
                    {open ? data?.map(item => (
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