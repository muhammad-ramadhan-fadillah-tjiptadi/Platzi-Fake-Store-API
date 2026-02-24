import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import CardList from "../components/CardList";
import FilterComp from "../components/FilterComp";
import PaginationComp from "../components/PaginationComp";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => {
        setCurrentPage(page);
        // Refresh data di pagination
        getDataProducts("https://api.escuelajs.co/api/v1/products?" + "&limit=4" + "&offset=" + currentPage);
    }

    function updateSearchValue(value) {
        setSearch(value);
        // If Else Search
        if (value === "") {
            getDataProducts();
        } else {
            getProducts("https://api.escuelajs.co/api/v1/products?title=" + value);
        }
    }

    function sortProducts(type) {
        // Copy data dari state untuk diproses untuk pengurutan fungsi js
        const newProducts = [...products];
        if (type == "Harga Termurah") {
            // Fungsi JS untuk mengurutkan nilai number : .sort(-)
            newProducts.sort((a, b) => a.price - b.price);
        } else if (type == "Harga Termahal") {
            newProducts.sort((a, b) => b.price - a.price);
        } else if (type == "Alfabet A - Z") {
            // Mengurutkan string : tolocaleCompare
            newProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (type == "Alfabet Z - A") {
            newProducts.sort((a, b) => b.title.localeCompare(a.title));
        }
        // Simpan hasil pengurutan ke state - force update dengan array baru
        setProducts([...newProducts]);
    }

    async function getProducts(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            setProducts(result);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function getDataProducts() {
        const url = "https://api.escuelajs.co/api/v1/products?" + "&limit=4" + "&offset=" + currentPage;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // isi state products dengan data dari API
            setProducts(result);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    // Memanggil atau menjalankan getdata API pas baru buka halamannya
    useEffect(() => {
        getDataProducts();
    }, []);

    if (loading == true) {
        return (
            <div className="block mx-auto mt-60 w-100 text-center">
                <Spinner />  Sedang memuat data...
            </div>
        )
    }

    return (
        <>
            <h1 className="text-3xl font-bold m-10">Daftar Lengkap Produk</h1>
            <FilterComp updateSearchValue={updateSearchValue} sortProducts={sortProducts} />
            <CardList data={products} type={"product"} />
            <PaginationComp currentPage={currentPage} onPageChange={onPageChange} />
        </>
    )
}