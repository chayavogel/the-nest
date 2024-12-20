import MyToyCard from "./MyToyCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchToys } from "../../Slices/ToySlice";

function MyToyCards( {user} ) {

    const toys = useSelector(state => state.toys.value);
    const dispatch = useDispatch();

   useEffect(() => {
        dispatch(fetchToys());
    }, [dispatch]);

    let filteredToys = toys.filter(toy => toy.user.id === user.id);

    return (
        <>  
            <div className="container text-center">
            <h3 className="title">My Posts</h3>
                <div className="row justify-content-center">
                    {filteredToys.map(toy => <MyToyCard key={toy.id} toy={toy} />)}
                </div>
            </div>
        </>
    );
}

export default MyToyCards;
