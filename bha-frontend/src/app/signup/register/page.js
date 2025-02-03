"use client"

import { useState } from 'react';

const RegistrationContents = ({ confirmReg }) => {
    const [registrationInfo, setRegistrationInfo] = useState({
        username: '',
        email: '',
        nickname: '',
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
        // onChangeRegistration(registrationInfo);
    };

    return (
        <div className="container">
            <div className="c_wrap">

                <form onSubmit={handleSubmit}>

                    <div className="layout">
                        <div className="contents BOARD_CREATE_REG" id="contents">

                            <div className="location"></div>
                            <div className="top_tit">
                                <h1 className="tit_1">회원 가입</h1>
                            </div>
                            <h2 className="tit_2">회원 정보를 입력해주세요</h2>

                            <div className="board_view_reg">
                                <dl>
                                    <dt><label htmlFor="username">아이디:</label></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="text" id="username" name="username"
                                               value={registrationInfo.username}
                                               onChange={handleInputChange} required/>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><label htmlFor="password">패스워드:</label></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="password" id="password"
                                               name="password" value={registrationInfo.password}
                                               onChange={handleInputChange} required/>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><label htmlFor="confirmPassword">패스워드 확인:</label></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="password" id="confirmPassword"
                                               name="confirmPassword"
                                               value={registrationInfo.confirmPassword} onChange={handleInputChange}
                                               required/>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><label htmlFor="username">닉네임:</label></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="text" id="username" name="username"
                                               value={registrationInfo.nickname}
                                               onChange={handleInputChange} required/>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><label htmlFor="email">이메일:</label></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="email" id="email" name="email"
                                               value={registrationInfo.email}
                                               onChange={handleInputChange} required/>
                                    </dd>
                                </dl>
                                <div className="board_bot"/>
                                <div className="board_btn_area">

                                    <div className="right_col btn1">
                                        <button className="btn btn_blue_h46 w_100">
                                            회원가입
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationContents;