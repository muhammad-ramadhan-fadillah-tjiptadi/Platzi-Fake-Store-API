import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function CardComp({ item }) {
  return (
    // Mengirim Data categoryId ke path dinamis, gunakan `` untuk tanda ${}
    <Link to={`/products/category/${item.id}`}>
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={item.image}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.name}
        </h5>
      </Card>
    </Link>
  );
}
