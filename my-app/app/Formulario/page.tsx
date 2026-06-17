"use client";

export default function Formulario() {
    return (
        <div>
            <h1>Formulario</h1>
            <form action="procesar-registro.php" method="POST">
                <label id="name">Name:</label>
                <input type="text" id="name" required/>
                <label id="email">Email:</label>
                <input type="email" id="email" required/>
                <label id="email">Asunto:</label>
                <input type="email" id="Description" required/>
                <button type="submit" value="Submit">Submit</button>
            </form>


        </div>

    );

}