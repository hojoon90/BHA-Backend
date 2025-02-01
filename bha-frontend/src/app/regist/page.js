"use client"

import { useState } from 'react';

const RegistrationContents = ({ onChangeRegistration }) => {
    const [registrationInfo, setRegistrationInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegistrationInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation and registration logic here
        onChangeRegistration(registrationInfo);
    };

    return (
        <div className="container">
            <div className="c_wrap">

                <form onSubmit={handleSubmit}>

                    <div className="layout">
                        <div className="contents BOARD_CREATE_REG" id="contents">

                            <div className="board_view2">
                                <dl>
                                    <dt><label htmlFor="username">아이디:</label></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="text" id="username" name="username" value={registrationInfo.username}
                                               onChange={handleInputChange} required/>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><label htmlFor="password">패스워드:</label></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="password" id="password" name="password" value={registrationInfo.password}
                                               onChange={handleInputChange} required/>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><label htmlFor="confirmPassword">패스워드 확인:</label></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="password" id="confirmPassword" name="confirmPassword"
                                               value={registrationInfo.confirmPassword} onChange={handleInputChange} required/>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><label htmlFor="email">이메일:</label></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="email" id="email" name="email" value={registrationInfo.email}
                                               onChange={handleInputChange} required/>
                                    </dd>
                                </dl>
                                <button type="submit">Register</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationContents;