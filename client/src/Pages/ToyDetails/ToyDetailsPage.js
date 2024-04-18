import ToyDetailsCard from "./ToyDetailsCard"
import { useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchToys } from "../../Slices/ToySlice"
import { useParams } from "react-router-dom";

function ToyDetailsPage() {
    const params = useParams();
    const toyId = params.id;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchToys());
    }, [dispatch]);
    
    const toy = useSelector(state =>
        state.toys.value.find(toy => toy.id === parseInt(toyId))
    );

    
    return (
        <>
        {toy && <ToyDetailsCard toy={toy} />}
        </>
    )
}

export default ToyDetailsPage