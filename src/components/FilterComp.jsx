import { Label, TextInput } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import { Dropdown, DropdownItem } from "flowbite-react";


export default function FilterComp({ updateSearchValue, sortProducts }) {
    return (
        <div className="flex mx-10">
            <div className="w-4xl">
                <TextInput id="email4" type="email" icon={IoIosSearch} placeholder="Cari Berdasarkan Nama produk" onKeyUp={(e) => updateSearchValue(e.target.value)} />
            </div>
            <Dropdown label="Urutkan Data" color="alternative" className="ms-3 w-sm" dismissOnClick={false}>
                <DropdownItem onClick={() => sortProducts('Harga Termurah')}>Harga Termurah</DropdownItem>
                <DropdownItem onClick={() => sortProducts('Harga Termahal')}>Harga Termahal</DropdownItem>
                <DropdownItem onClick={() => sortProducts('Alfabet A - Z')}>Alfabet A - Z</DropdownItem>
                <DropdownItem onClick={() => sortProducts('Alfabet Z - A')}>Alfabet Z - A</DropdownItem>
            </Dropdown>
        </div>
    )
}