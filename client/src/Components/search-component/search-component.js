import React from 'react';
import {useHistory  } from 'react-router-dom';
import { Input, Space } from 'antd';
import './search-component.scss';

const { Search } = Input;

function SearchComponent() {
    
    const history = useHistory();

    const OnSearch=(value)=>{
        console.log(value);
        history.push("/items?search="+value);
    } 
    
    return (
        <Space direction="vertical" size={100} className="search">
            <Search placeholder="Nunca dejes de buscar" onSearch={OnSearch} />
        </Space>
    )
}
export default SearchComponent;