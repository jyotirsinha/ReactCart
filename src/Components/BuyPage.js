import React,{useState, useEffect} from "react"
import Axios from "axios";
import CardItem from "./Cartitem";
import {random, commerce} from 'faker';
import {Container, Col, Row} from "reactstrap"


const apiKey = "563492ad6f91700001000001fdd81553c3504905b0a5c4f5797b0245"
const localurl = "https://myjson.dit.upm.es/api/bins/1mnk"
const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1"

const BuyPage = ({addInCart}) => {
    const [product, setProduct] = useState([])

    // const fetchPhotos = async () => {
    //     const response = await Axios.get(url, {
    //         header: {
    //             Authorization: apiKey
    //         }
    //     })
    // }

    const fetchPhotos = async () => {
        const {data} = await Axios.get(localurl)
    

    const {photos} = data;

    const allProducts = photos.map(photo => ({
        smallImage: photo.src.medium,
        tinyImage: photo.src.tiny,
        productName : random.word(),
        productPrice: commerce.price(),
        id: random.uuid()
    }));
    setProduct(allProducts);
    };

    
    useEffect(()=> {
        fetchPhotos()
    }, []);

    return(
        <Container fluid>
            <h1 className=" text-success text-center">
                Buy Page
            </h1>
            <Row>
                {product.map(product => (
                    <Col md={4} key={product.id}>
                        <CardItem product={product} addInCart={addInCart} />
                    </Col>
                ))}
            
            </Row>
        </Container>
        
    )
};


export default BuyPage;