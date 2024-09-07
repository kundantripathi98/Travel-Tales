import styles from './CountryList.module.css'
import Spinner from '../../components/Spinner'
import CountryItem from './CountryItem';
import Message from '../Message';
import { useCity } from '../../contexts/CitiesContext';

const CountryList = () => {
  const {cities, isLoading} = useCity();

    if(isLoading) return <Spinner/>

    if(!cities.length) return <Message message="Add your first city by clicking on a city on the Map"/>

    let countries = cities.reduce((arr, city)=>{
       if (!arr.map(el=>el.country).includes(city.country)){
        return [...arr, {country: city.country, emoji: city.emoji}]
       }else{
       return arr
       }
    }, []);

    // console.log(countries);
    
    
  return (
    <ul className={styles.countryList}>
        {countries.map((country)=>(
            <CountryItem country={country} key={country.country}/>
        ))}
    </ul>
  );
};

export default CountryList;