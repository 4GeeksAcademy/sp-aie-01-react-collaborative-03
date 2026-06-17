"use client";

import { useState } from "react";

interface FormData {
    name: string, 
    email: string,
    subject: string,
}

const initialData: FormData = {
    name: "",
    email: "",
    subject: "",
}

const FormularioSergioMBPage = () => {

    const [data, setData] = useState<FormData>(initialData);

    const onDataChange = (event: any) => {
        const { id, value } = event.target;
        //console.log("target:", event.target);
        setData((prev) => ({
            ...prev,
            [id]: value,
        }));
    }
    
    const onSubmit = (event: any) => {
        event.preventDefault();
        console.log("Data to send:", data)
    }

    return (
        <div className="flex flex-col justify-center align-center items-center">
            <div>
                <h1>Formulario</h1>
                <h2>Formulario hecho a mano para prácticar estados de React.</h2>
            </div>

            <form className="flex flex-col w-2xl" onSubmit={onSubmit}>
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={onDataChange}
                    placeholder="Introduce nombre..." required
                />

                <label htmlFor="email">Correo</label>
                <input
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={onDataChange}
                    placeholder="Introduce correo..." required
                />

                <label htmlFor="subject">Asunto</label>
                <textarea
                    id="subject"
                    placeholder="Introduce asunto..."
                    value={data.subject}
                    onChange={onDataChange}
                    required
                />


                <button
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-4 py-2.5"
                    onClick={onSubmit}>
                    Enviar
                </button>
            </form>
        </div>

    );
}

export default FormularioSergioMBPage;