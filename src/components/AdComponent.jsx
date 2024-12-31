import { useEffect } from 'react';

const AdComponent = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client="ca-pub-9658645973102544"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
    );
};

export default AdComponent;
