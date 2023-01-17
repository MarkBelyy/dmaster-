import React, { useState } from 'react'
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";
import './reglogstyle.css'

function Login() {
    const [register, setRegister] = useState(() => {
        return {
            username: "",
            password: "",
            loading: false,
            message: ""
        }
    })
    const [loading, setLoading] = useState(false)
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
    const submitChackin = event => {
        event.preventDefault();
        AuthService.login(
            register.username,
            register.password
        ).then(
            () => {
                this.props.router.navigate("/profile");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false)
                setMessage(resMessage)
                console.log(register.username,
                    register.password)
            }
        );

    }
    return (
        <div className='regroot'>
            <div className='regrootblock'>
                <div className='regblock'>
                    <div className='leftblock'>
                        <div className='leftinner'>
                            <h1 className='lefttitle'>Ещё нет аккаунта?</h1>
                            <p className='lefttext'>Зарегестрируйтесь, чтобы воспользоваться всеми функциями сайта</p>
                            <Link to={"/register"}>
                                <button className='leftbtn'>РЕГИСТРАЦИЯ</button>
                            </Link>
                        </div>
                    </div>
                    <div className='rightblock'>
                        <div className='rightinner'>
                            <div className='rightregblock'>
                                <h1 className='righttitle'>Войти</h1>
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
                                    <input className='reginput' placeholder='Пароль'
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={register.password}
                                        onChange={changeInputRegister}
                                    />
                                    <div className='regbtnblock'>
                                        <button type="submit" onClick={submitChackin} className='rightbtn'>ВХОД</button>
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

export default withRouter(Login);