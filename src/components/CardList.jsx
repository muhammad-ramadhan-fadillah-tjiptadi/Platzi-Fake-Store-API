import CardComp from "./CardComp";
import CardCommerceComp from "./CardCommerceComp";

export default function CardList({ data, type, children }) {
    return (
        <div className="w-4xl block mx-auto">
            {children}
            <div className="grid grid-cols-4 gap-3 mt-15">
                {data.map((item, index) =>
                    type == "category" ? (
                        <CardComp item={item} key={index} />
                    ) : (
                    <CardCommerceComp item={item} key={index} />
                    )
                )}
            </div>
        </div>
    );
}