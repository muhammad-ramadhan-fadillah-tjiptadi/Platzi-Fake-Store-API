import { useState } from "react";
import NavbarComp from "./components/NavbarComp";
import BannerComp from "./components/BannerComp";
import CardComp from "./components/CardComp";
import CardList from "./components/CardList";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";

export default function App() {
  const [categoryProducts, setCategoryProducts] = useState([]);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  async function getDataCategories() {
    const url = "https://api.escuelajs.co/api/v1/categories";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      // isi state categoryProducts dengan data dari API
      setCategoryProducts(result.slice(0, 4));
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getDataProducts() {
    const url = "https://api.escuelajs.co/api/v1/products";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      // isi state categoryProducts dengan data dari API
      setProducts(result.slice(3, 7));
      // mengganti loading state menjadi false untuk menghilangkan spinner
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Memanggil atau menjalankan getdata API pas baru buka halamannya
  useEffect(() => {
    getDataCategories();
    getDataProducts();
  }, []);

  // Jika loading true, return pake yang ini
  if (loading == true) {
    return (
      <div className="block mx-auto mt-60 w-100 text-center">
        <Spinner />  Sedang memuat data...
      </div>
    )
  }

  // JIka loading false, return pake yang ini
  return (
    <>
      <div className="mx-15 my-5">
        <BannerComp />
        <CardList data={categoryProducts} type={"category"} />
        <CardList data={products} type={"product"}>
          <div className="flex justify-between mt-15">
            <h1 className="text-2x1 font-bold">Daftar Produk Populer</h1>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white hover:bg-gradient-to-br focus:ring-cyan-300">
                Selengkapnya
              </Button>
            </Link>
          </div>
        </CardList>
      </div>
    </>
  );
}
