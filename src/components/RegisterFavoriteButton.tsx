import React from "react";
import axios from "axios";
import { useRouter } from 'next/router'

const RegisterFavoriteButton: React.FC = () => {
    const router = useRouter()

    const handleRegistration = () => {
        try {
            axios.put('/api/regist')
                .then(res => {
                    console.log(res)
                    router.reload()
                })
                .catch(error => {
                    console.log(error);
                });
            console.log("finish")
        }catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleRegistration}>
            再登録
        </button>
    );
};

export default RegisterFavoriteButton;
