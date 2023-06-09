import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function HandleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            await axios.post('/login', {email, password});
            alert('login sucessfull')
        } catch (e) {
            alert('Login failed!!')
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">LOGIN</h1>
            <form className="max-w-xl mx-auto " onSubmit={HandleLoginSubmit}>
                <input type = "email" placeholder ="email@gmail.com" 
                value={email}
                onChange={ev => setEmail(ev.target.value)}/>
                <input type = "password" placeholder = "password" 
                value={password}
                onChange={ev => setPassword(ev.target.value)}/>
                <button className="login mt-4">login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have a account yet?
                    <Link className="underline text-black" to = {'/register'}>  Register now</Link>
                </div>
            </form>
            </div>
            
        </div>
    )
}