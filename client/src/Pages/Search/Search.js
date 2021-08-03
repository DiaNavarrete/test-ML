import React, {useState} from 'react';
import {  useHistory,useLocation, Link} from "react-router-dom";
import { List, Breadcrumb , Spin   } from 'antd';
import './Search.scss';
import ItemComponent from '../../Components/Item-component/Item-component';
import { LoadingOutlined } from '@ant-design/icons';


function SearchPage(){
    const [items, setItems] = useState();
    const [path, setPath] = useState([]);
    const history = useHistory();
    let params = new URLSearchParams(useLocation().search);
    let query=params.get("search"); 
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    
    React.useEffect(() => {
        if(!query){
            history.push("/");
        }
        console.log('query load',query);
        fetch("/api/items?q="+query)
            .then((res) =>  {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(data => {
                setItems(data.items);
                setPath(data.categories);
            })
            .catch((err)=>{
                console.log(err);
                setItems([]);
                setPath(['Buscar']);
            });
    }, [query]);
    
    return (
        <div> 
            {
            !items ? <Spin indicator={antIcon} />
            :
            <div>            
                <Breadcrumb  separator=">" className="breadcrumb">
                    <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                    {
                        path.map((x, index)=>(
                        <Breadcrumb.Item key={index}>
                            {x}
                        </Breadcrumb.Item>

                        ))
                    }
                    {/*<Breadcrumb.Item>{query}</Breadcrumb.Item>*/}
                </Breadcrumb>          
                    <List
                    itemLayout="horizontal"
                    dataSource={items}
                    renderItem={item =>(
                        <div className="item-wrapper">
                            <Link to={"/items/"+item.id}>
                                <ItemComponent {...item}></ItemComponent>
                            </Link>
                        </div>
                    )}
                    />
            </div>
            }
        </div>
    )
}

export default SearchPage;