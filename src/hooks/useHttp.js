import { useCallback, useEffect, useState } from "react";

async function sendHttp(url, config){
    const response = await fetch(url, config);

    const resData = await response.json();

    if(!response.ok){
        throw new Error(resData.message || 'error');
    }

    return resData;

}

export default function useHttp(url, config, initialData){
    const[error, setError] =  useState();
    const [loading, setLoading] = useState(false);
    const[data, setData] = useState(initialData);

    function clearData(){
        setData(initialData);
    }

    const sendReq = useCallback(
        async function sendReq(data){
        setLoading(true);
        try{
        const resData = await sendHttp(url, {...config, body: data});
        setData(resData);
        }catch(error){
            setError(error.messsage  || 'error');
        }
        setLoading(false);
        } , [url, config])

        useEffect(() => {
            if(config && (config.method === 'GET' || !config.method) || !config){
                  sendReq();
            }
        }, [sendReq, config]);

        return {
            data, loading, error, sendReq,clearData
        }

}