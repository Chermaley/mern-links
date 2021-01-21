import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../authContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        setInterval(() => {
            clearError();
        }, 2000)
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId);
        }catch (e) {}
    }

    return (
        <div className="row">
            <div className={"col s6 offset-s3"}>
                <h1>Сократи Ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input id="email"
                                       type="text"
                                       value={form.email}
                                       placeholder={"введите email"}
                                       name={"email"}
                                       className={"yellow-input"}
                                       onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    value={form.password}
                                    type="password"
                                    placeholder={"введите пароль"}
                                    name={"password"}
                                    className={"yellow-input"}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button disabled={loading} onClick={loginHandler} className={'btn yellow darken-4'} style={{marginRight: 10}}>Войти</button>
                        <button disabled={loading} onClick={registerHandler} className={'btn grey lighten-1 black-text'}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    );
}