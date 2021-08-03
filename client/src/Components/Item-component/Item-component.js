import React from 'react';
import './Item-component.scss';
import { withRouter  } from 'react-router-dom';

class ItemComponent extends React.Component {
    constructor(props) {
      super(props);
      this.ShowItem = this.ShowItem.bind(this);
    }

    ShowItem=(event,item)=>{
        event.preventDefault();
        console.log(item); 
        this.props.history.push("/items/6");
    }

    render() {
        //console.log(this.props)
        const price= new Intl.NumberFormat("de-DE").format(this.props.price); 
        const title= this.props.title;
        const place= this.props.address.city_name;
        const thumbnail= this.props.thumbnail;
        const free_shipping= this.props.shipping.free_shipping;
        return (
            <div className="Item-wrapper" >
                <div className="img-wrapper">
                    <img  src={thumbnail}  alt="logo " />
                </div>
                <div className="Item-data">
                    <span className={`i-price ${free_shipping ? "i-free" : ""}`}>$ {price}</span>
                    <span className="i-place">{place}</span>
                    <p className="i-title">{title}</p>
                </div>
            </div>
        )
    }
  }
export default withRouter(ItemComponent);