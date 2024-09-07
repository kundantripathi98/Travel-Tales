import styles from './CityList.module.css'
import Spinner from '../../components/Spinner'
import CityItem from './CityItem';
import Message from '../Message';
import { useCity } from '../../contexts/CitiesContext';

const CityList = () => {
  const {cities, isLoading, error} = useCity();
    if(isLoading) return <Spinner/>

    if(error) return <Message message={error}/>

    if(!cities.length) return <Message message="Add your first city by clicking on a city on the Map"/>

  return (
    <ul className={styles.cityList}>
        {cities.map((city)=>(
          <CityItem key={city.id} city={city}/>
        ))}
    </ul>
  );
};

export default CityList;