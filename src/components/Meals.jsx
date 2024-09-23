import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Meals(){
    const {data: meals, loading, error } =
    useHttp('http://localhost:3000/meals', requestConfig, []);

    if(loading){
        return <p className="center"> Fetching meals....</p>
    }

    if(error){
        return <Error title='Failed to fetch meals'  mess={error}/>
    }

    return (
        <ul id="meals">
            {meals.map((meal) => {
                return (
                        <MealItem key={meal.id} meal={meal} 
                        />
                )
            })}
             
        </ul>
    )
}