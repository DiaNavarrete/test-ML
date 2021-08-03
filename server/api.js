const axios = require ('axios').default;

const signature={
    name: "Diana",
    lastname: "Navarrete"
};

const findProduct= async (query)=>{
    const resp= await axios.get('https://api.mercadolibre.com/sites/MLA/search', {
            params: {
                q: query
            }
        }).catch((err)=>{
            //console.log(err)
            return Promise.reject(err);
        })
    const cat_obj= resp.data.filters[0].values[0].path_from_root;
    const cat_arr= cat_obj.map(x=>x.name);
    const data={
        author: signature,
        categories:cat_arr,
        items: resp.data.results.slice(0,4)
    };
    return data;
};

const getProduct= async (id)=>{
    const requestDescr=axios.get('https://api.mercadolibre.com/items/'+id+'/description');
    const requestProd=axios.get('https://api.mercadolibre.com/items/'+id);
    const resp= await axios.all([requestDescr,requestProd]).catch((err)=>{
        //console.log('Error ->',err);
        return Promise.reject(err);
    });
    const descrip=resp[0].data.plain_text;
    const prod_resp=resp[1].data;
    const data={
        author: signature,
        item:{
            id:prod_resp.id,
            title:prod_resp.title,
            price:{
                currency: prod_resp.currency_id,
                amount: prod_resp.price,
                decimals: 0
            },
            picture: prod_resp.pictures[1].url,
            condition: prod_resp.condition,
            free_shipping: prod_resp.shipping.free_shipping,
            sold_quantity: prod_resp.sold_quantity,
            description: descrip
        }
    };
    return data;
};

module.exports = {
    findProduct,
    getProduct
}
