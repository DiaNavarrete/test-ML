import React, { useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Row, Col,Button, Breadcrumb,  Spin  } from 'antd';
import './Product.scss';
import { LoadingOutlined } from '@ant-design/icons';

function ProductPage(props){
    const [product, setProduct] = useState();    
    const [price, setPrice] = useState(0);    
    let {id}  = useParams();
    const history = useHistory();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    React.useEffect(() => {
        console.log('product id',id,);//params.id
        fetch("/api/items/"+id)
            .then((res) =>   {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(data => {
                setProduct(data.item);
                setPrice(new Intl.NumberFormat("de-DE").format(data.item.price.amount)); 
            })
            .catch((err)=>{
                console.log(err);
                history.push("/");
            });
    }, [id]);
    
    return (
        <div>
        {
        !product ? <Spin indicator={antIcon} />
        :
            <div>
                <Breadcrumb  separator=">" className="breadcrumb">
                    <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                    <Breadcrumb.Item>Buscar</Breadcrumb.Item>
                    <Breadcrumb.Item>Producto</Breadcrumb.Item>
                </Breadcrumb>  
                <div className="Product-wrapper">
                    <Row>
                    <Col span={16} >                        
                        <img src={product.picture}  alt="product image" />
                        <div className="descr-wrapper">
                            <h2>Descripción del producto</h2>
                            <p>{product.description}</p>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="product-info">
                            <p className="p-quantity">{product.condition} - {product.sold_quantity} vendidos</p>
                            <h1 className="p-title"> {product.title} </h1>
                            <p className="p-price"> $ {price}</p>
                            <Button type="primary" >Comprar</Button>
                        </div>
                    </Col>
                    </Row>
                </div>
            </div>
        }
        </div>
    );
}

export default ProductPage;