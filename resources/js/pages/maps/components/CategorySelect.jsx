import React from "react";

const CategorySelect = ({ value, onChange }) => (
    <div className=" lg:w-[15%]  ">
        <select className="p-3 rounded" value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">All Categories</option>
            <option value="App\\Models\\Organization">Organisation de la Société Civile (OSC)</option>
            <option value="App\\Models\\Bailleur">Bailleur de Fonds</option>
            <option value="App\\Models\\Publique">Institution Publique</option>
            <option value="App\\Models\\Entreprise">Entreprise du Secteur Privé</option>
            <option value="App\\Models\\Academique">Institution Académique et de Recherche</option>
            <option value="App\\Models\\Agence">Agence des Nation Unies et de Coopération Internationale</option>
        </select>
    </div>
);

export default CategorySelect;



