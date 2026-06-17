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

const fieldContainerClass = "flex flex-col gap-2";

const labelClass = "text-slate-300 font-medium";

const inputClass = `
  bg-slate-800
  border border-slate-700
  text-white
  placeholder:text-slate-500
  rounded-lg
  px-4 py-3
  outline-none
  transition-all
  focus:border-blue-500
  focus:ring-4
  focus:ring-blue-500/20
`;

const buttonClass = `
  mt-2
  bg-blue-600
  hover:bg-blue-500
  text-white
  font-semibold
  py-3
  rounded-lg
  transition-all
  duration-200
  shadow-lg
  shadow-blue-600/20
  hover:shadow-blue-500/40
  hover:-translate-y-0.5
  active:translate-y-0
`;

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
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Formulario
                    </h1>
                    <h2 className="text-slate-400 mt-2">
                        Formulario hecho a mano para practicar estados de React.
                    </h2>
                </div>

                <form
                    className="flex flex-col gap-5"
                    onSubmit={onSubmit}
                >
                    <div className={fieldContainerClass}>
                        <label htmlFor="name" className={labelClass}>
                            Nombre
                        </label>

                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={onDataChange}
                            placeholder="Introduce tu nombre..."
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className={fieldContainerClass}>
                        <label htmlFor="email" className={labelClass}>
                            Correo
                        </label>

                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={onDataChange}
                            placeholder="Introduce tu correo..."
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className={fieldContainerClass}>
                        <label htmlFor="subject" className={labelClass}>
                            Asunto
                        </label>

                        <textarea
                            id="subject"
                            value={data.subject}
                            onChange={onDataChange}
                            placeholder="Escribe tu mensaje..."
                            rows={5}
                            required
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    <button type="submit" className={buttonClass}>
                        Enviar
                    </button>
                </form>
            </div>
        </main>
    );
}

export default FormularioSergioMBPage;