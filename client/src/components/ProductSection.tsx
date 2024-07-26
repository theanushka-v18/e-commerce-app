import "../styles/productSection.css";
import ProductCard from "./ProductCard";

const NewArrivals = (props: any) => {
  return (
    <div className="new-arrivals-section">
      <h1>{props.heading}</h1>
      <div className="product-cards">
        <ProductCard
          imgSrc={props.frame32}
          cardTitle={props.cardTitle1}
          price={props.price1}
          rating={props.rating1}
        />
        <ProductCard
          imgSrc={props.frame33}
          cardTitle={props.cardTitle2}
          price={props.price2}
          rating={props.rating2}
        />
        <ProductCard
          imgSrc={props.frame34}
          cardTitle={props.cardTitle3}
          price={props.price3}
          rating={props.rating3}
        />
        <ProductCard
          imgSrc={props.frame35}
          cardTitle={props.cardTitle4}
          price={props.price4}
          rating={props.rating4}
        />
      </div>
      <div className="view-all">
        <a href="/">View All</a>
      </div>
    </div>
  );
};

export default NewArrivals;
