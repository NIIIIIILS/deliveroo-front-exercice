import "./App.css";
import { useState, useEffect } from "react";
import logo from "./assets/images/logo.png";
import defaultImage from "./assets/images/default-meal.png";
import { FaStar } from "react-icons/fa";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatString = (str) => {
    if (str.length < 60) {
      return str;
    } else {
      for (let i = 0; i < str.length; i++) {
        if (i > 60 && str[i] === " ") {
          return str.slice(0, i) + "...";
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-deliveroo--fn6hxrqtx4nq.code.run/"
        );
        // console.log(response.data); test
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // console.log("data =>", data);
  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <>
      <header>
        <div className="container">
          <img src={logo} alt="logo deliveroo" />
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <div className="hero-left">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img
            src={data.restaurant.picture}
            alt="magnifique plateau repas (avec saumon et cookies)"
          />
        </div>
      </section>
      <main>
        <div className="container">
          <section>
            {data.categories.map((category, index) => {
              // console.log(category);
              return (
                // permet de n'afficher que les categories dont le tableau "meal" n'est pas vide
                category.meals.length > 0 && (
                  <div className="category" key={category.name + index}>
                    <h2>{category.name}</h2>
                    <section className="meal-list">
                      {category.meals.map((meal) => {
                        // console.log(meal);
                        return (
                          <article key={meal.id} className="meal">
                            <div>
                              <h3>{meal.title}</h3>
                              <p>{formatString(meal.description)}</p>
                              <div>
                                <p>{meal.price + " €"}</p>
                                {meal.popular && (
                                  <p className="popular">
                                    <FaStar /> Populaire
                                  </p>
                                )}
                              </div>
                            </div>
                            {meal.picture ? (
                              <img
                                src={meal.picture}
                                alt="presentation du plat (appetissant)"
                              />
                            ) : (
                              <img
                                src={defaultImage}
                                alt="presentation du plat (appetissant)"
                              />
                            )}
                          </article>
                        );
                      })}
                    </section>
                  </div>
                )
              );
            })}
          </section>
          <section className="bucket">Votre panier est vide</section>
        </div>
      </main>
    </>
  );
}

export default App;
