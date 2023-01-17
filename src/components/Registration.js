import React, { useState } from 'react'
import validator from 'validator';
import './reglogstyle.css'
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
export default function Registration() {
    const [register, setRegister] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    })
    const [successful, setSuccesful] = useState(false)
    const [message, setMessage] = useState('')




    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    // const sendData = async () => {
    //     var data = { 'login': register.username, 'password': register.password, 'contactData': register.email }
    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST', // или 'PUT'
    //             mode: 'no-cors',
    //             body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
    //             headers: {
    //                 'Accept': 'application/json, text/plain',
    //                 'Content-Type': 'application/json;charset=UTF-8'
    //             }
    //         });
    //         const json = await response.json();
    //         console.log('Успех:', JSON.stringify(json));
    //         console.error(JSON.stringify(data));
    //     } catch (error) {
    //         console.error(JSON.stringify(data));
    //         console.error(data);
    //         console.error('Ошибка:', error);
    //     }
    // }
    const submitChackin = event => {
        event.preventDefault();
        if (!validator.isEmail(register.email)) {
            alert("You did not enter email")
        } else if (register.password !== register.password2) {
            alert("Repeated password incorrectly")
        } else if (!validator.isStrongPassword(register.password, { minSymbols: 0 })) {
            alert("Password must consist of one lowercase, uppercase letter and number, at least 8 characters")
        } else {
            AuthService.register(
                register.username,
                register.password,
                register.email
            ).then(
                response => {
                    setMessage(response.data.message)
                    setSuccesful(true)
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setSuccesful(false)
                    setMessage(resMessage)
                    console.log(register.username,
                        register.password,
                        register.email)
                }
            );
        }
    }

    return (
        <div className='regroot'>
            <div className='regrootblock'>
                <div className='regblock'>
                    <div className='leftblock'>
                        <div className='leftinner'>
                            <h1 className='lefttitle'>Уже есть аккаунт?</h1>
                            <p className='lefttext'>Войдите, чтобы воспользоваться всеми функциями сайта</p>
                            <Link to={"/login"}>
                                <button className='leftbtn'>ВХОД</button>
                            </Link>
                        </div>
                    </div>
                    <div className='rightblock'>
                        <div className='rightinner'>
                            <div className='rightregblock'>
                                <h1 className='righttitle'>Создать аккаунт</h1>
                            </div>
                            <div className='rightregblock'>
                                <form className='regform'>
                                    <input className='reginput' placeholder='Логин'
                                        type="username"
                                        id="username"
                                        name="username"
                                        value={register.username}
                                        onChange={changeInputRegister}
                                    />
                                    <input className='reginput' placeholder='Почта'
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={register.email}
                                        onChange={changeInputRegister}
                                        formNoValidate
                                    />
                                    <input className='reginput' placeholder='Пароль'
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={register.password}
                                        onChange={changeInputRegister}
                                    />
                                    <input className='reginput'
                                        placeholder='Ещё раз'
                                        type="password"
                                        id="password2"
                                        name="password2"
                                        value={register.password2}
                                        onChange={changeInputRegister}
                                    />
                                    <div className='regbtnblock'>
                                        <button type="submit" onClick={submitChackin} className='rightbtn'>РЕГИСТРАЦИЯ</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
