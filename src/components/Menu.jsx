import React, { useState } from "react";
import Gelato from "./Gelato";
import axios from "axios";

const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";

const Menu = () => {
  // Loading state fro data fetching
  const [isLoading, setIsLoading] = useState(true)
  // Error Handling State
  const [isError, setIsError] = useState(false)
  // Tutti i prodotti
  const [prodotti, setProdotti] = useState()
  // active btn selector
  const [selected, setSelected] = useState(0)
  // prdotti filtri da prodotti state
  const [filterProdcuts, setFilterProdcuts] = useState()
  // categorie di prodotti

  const [categorie, setCategorie] = useState([])
  // const categorie = Array.from(new Set(prodotti.map((el) => el.categoria)))

  // aggiunge all'array categorie una cose (all'inizio) di all
  // categorie.unshift('all');

  const filtraProdotti = (categoria,index) => {
    setSelected(index)
    if(categoria === 'all'){
      setFilterProdcuts(prodotti)
    }else{
      setFilterProdcuts(prodotti.filter(el => el.categoria === categoria ? el : ''))
    }
  }
  
  React.useEffect(()=>{
    // funzione eseguita immadiatamente
    (async() => {
      setIsLoading(true)
      setIsError(false)
      try {
        const res = await axios.get(url)
        setProdotti(res.data.data)
        setFilterProdcuts(res.data.data)
        // console.log(res.data.data);

        // Categorie Array
        const nuoveCategorie = Array.from(new Set(res.data.data.map((el) => el.categoria)))
        nuoveCategorie.unshift('all');

        setCategorie(nuoveCategorie);

        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsLoading(false)
        setIsError(true)
        console.log(error);
      }
    })()
  },[])

  return <div className="container">
    <h4 style={{textAlign: "center", textTransform: "uppercase"}}>
      Le nostre scelte
    </h4>
    { !isLoading && !isError ? (
      <>
        <div className="lista-categorie">
        {categorie.map((categoria, index) => {
            return (
            <button key={index} type="button" className={`btn btn-selector ${index === selected && 'active'}`} onClick={() => filtraProdotti(categoria,index)}>
              {categoria}
            </button>
          )})
        }
        </div>
        <div className="vetrina">
        {
          filterProdcuts.map((el)=> <Gelato key={el.id} {...el} />)
        }
        </div>
    </>
    ) : !isLoading && !isError ? (
        <h4 
        style={{position: "absolute", top: "50%", left:"50%", trasform: "translate(-50%, -50%)" }}
        >Error...
        </h4>
      ) : (
        <div class="ice-cream">
        <div class="body">
          <div class="loading">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
          // <h4 
          // style={{position: "absolute", top: "50%", left:"50%", trasform: "translate(-50%, -50%)" }}
          // >Loading...
          // </h4>
      )}
  </div>;
};

export default Menu;
