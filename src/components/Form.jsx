// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCity } from "../contexts/CitiesContext";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState("");

  const [lat, lng] = useUrlPosition();

  const {isLoading, createCity} = useCity();

  
  useEffect(()=>{
    if(!lat && !lng) return;
    
    async function fetchCityData() {
      try{
        setIsLoadingGeoCoding(true);
        
        const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=4f02a4371f744307b01c8d9eae324153`);
        const data = await res.json();
        setCityName(data.results[0].city);
        setCountry(data.results[0].country);
        setEmoji(convertToEmoji(data.results[0].country_code))
        console.log(data.results[0].city);
      }
      catch(err){
        console.log(err);
      }
      finally{
        setIsLoadingGeoCoding(false);
      }
    }
    fetchCityData()
  }, [lat, lng]);

  // console.log(cityName);

  
  console.log(lat);

 async function handleForm(e){
    e.preventDefault();

    if(!cityName || !date) return;

    let newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: {
        lat,
        lng
      },
    }

    await createCity(newCity);
    navigate("/app")
  };

  if(!lat && !lng) return <Message message="Start by Clicking on the map"/>
  
if(isLoadingGeoCoding) return <Spinner/>

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading: ""}`} onSubmit={handleForm}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
      <Button type="primary">Add</Button>

        <Button type="back" onClick={(e)=>{
          e.preventDefault();
          navigate(-1);
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
