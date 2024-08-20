import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Pokemon = ({ name }) => {
    const { id } = useParams(); // Para obtener el ID de la URL si está presente
    const [poke, setPoke] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function obtenerDataApi() {
            try {
                const searchTerm = id || name.toLowerCase(); // Usa el ID de la URL o el nombre proporcionado
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}/`);
                if (!response.ok) {
                    throw new Error('Pokemon no encontrado');
                }
                const datosApi = await response.json();
                setPoke(datosApi);
            } catch (err) {
                setError(err.message);
            }
        }
        obtenerDataApi();
    }, [id, name]);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : poke ? (
                <>
                    <div>
                        <h2>Pokemon: {poke.name}</h2>
                        <p>ID: {poke.id}</p>
                        <p>Base experience: {poke.base_experience}</p>
                        <p>Height: {poke.height} dm</p>
                        <p>Weight: {poke.weight} hg</p>
                        
                        <p>Species: {poke.species.name}</p>
                        <div>
                            <p>Sprites:</p>
                            <img src={poke.sprites.front_default} alt={`${poke.name} front`} />
                            <img src={poke.sprites.back_default} alt={`${poke.name} back`} />
                            <img src={poke.sprites.front_shiny} alt={`${poke.name} shiny front`} />
                            <img src={poke.sprites.back_shiny} alt={`${poke.name} shiny back`} />
                        </div>
                    </div>
                    <div>
                        <p>Stats:</p>
                        <ul>
                            {poke.stats.map((stat) => (
                                <li key={stat.stat.name}>
                                    {stat.stat.name}: {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                        <p>Types:</p>
                        <ul>
                            {poke.types.map((type) => (
                                <li key={type.type.name}>{type.type.name}</li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};
