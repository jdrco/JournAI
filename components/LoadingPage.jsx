import React from 'react';
import { ColorRing } from  'react-loader-spinner';

const LoadingPage = () => {
    return (
        <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#d7d9b1', '#84acce', '#827191', '#7d1d3f', '#512500']}
        />
    );
}
 
export default LoadingPage;