import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const imgSrcList = [
    "https://source.unsplash.com/random/300×300/?handloom",
    "https://source.unsplash.com/random/300×300/?lightlamp",
    "https://source.unsplash.com/random/300×300/?painting",
  ];

function Product({productName,originalPrice,offerPrice})
{
    return(
        <>
        <NavBar/>
        <div style={{marginTop:50, marginLeft:300, marginBottom:10,marginRight:300}} >
        <ImageCarousel imgSrcList={imgSrcList}/>
        </div>
        <div style={{marginTop:50, marginLeft:300, marginBottom:100,marginRight:300}}>
           <h2>{productName}</h2>
           <p>
           <span>&#8377;</span>
            <del>{originalPrice}</del>&nbsp;
            <span>&#8377;</span>
            {offerPrice}
            </p>
        </div>
        <Footer/>
        </>
    );
}

export default Product;