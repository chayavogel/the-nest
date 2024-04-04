// /Users/chayavogel/Documents/Flatiron/phase-5/the-nest/client/src/components/Pages/ToyPage.js

import ToyCard from "../Features/ToyCard"
import { useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchToys } from "../State/ToySlice"

function ToyPage() {
    const toys = useSelector(state => state.toys.value)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchToys());
    }, [dispatch]);

    return (
        <>
        {toys.map(toy => <ToyCard key={toy.id} toy={toy}/>)}
        </>
    )
}

export default ToyPage