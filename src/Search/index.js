import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css'



function App() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then((res) => {
                setCountries(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setFilteredCountries(
            countries.filter((country) =>
                country.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, countries]);

    if (loading) {
        return <p>Loading countries...</p>;
    }

    return (
        <div className="App">
            <h1>Countries Lists</h1>
            <p>
                If you like my work, please support by subscribing{" "}
                <a
                    style={{ color: "red" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/channel/UCdItDI6oTgPW7l9WOJI7ItA/"
                >
                    D'coders youtube channel
                </a>
            </p>
            <input
                type="text"
                placeholder="Search Countries"
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredCountries.map((country, idx) => (
                <CountryDetail key={idx} {...country} />
            ))}
        </div>
    );
}

const CountryDetail = (props) => {
    const { name, flag } = props;

    return (
        <div className='div'>
            <span>
                <img src={flag} alt={name} style={{ width: "90%", height: "100px" }} />
            </span>
            <p>{name}</p>

        </div>
    );
};


export default App;
