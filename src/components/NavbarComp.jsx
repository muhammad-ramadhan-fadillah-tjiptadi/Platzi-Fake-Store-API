import imgLogo from "../assets/Icon-Shop.png";
import { FcPaid } from "react-icons/fc";
import { HiViewGrid, HiCog, HiLogout } from "react-icons/hi";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Badge } from "flowbite-react";
import { CartContext } from "../context/CartContext";

export default function NavbarComp() {
    const { isLogin, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    const navigate = useNavigate();
    // Handler event click button logout
    function handleClickLogout() {
        logout();
        navigate("/login");
    }
    return (
        <Navbar fluid rounded>
            <NavbarBrand href="https://flowbite-react.com">
                <img src={imgLogo} className="mr-3 h-6 sm:h-9" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    <Link to="/">
                        Platzi Fake Store
                    </Link>
                </span>
            </NavbarBrand>
            <div className="flex md:order-2">
                <div className="relative">
                    <Badge color="failure" className="rounded-full absolute top-0 left-0">{cart.length}</Badge>
                    <Link to="/cart">
                        <FcPaid className="me-2 mt-1 text-3xl" />
                    </Link>
                </div>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded
                        />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">
                            name@flowbite.com
                        </span>
                    </DropdownHeader>
                    <Link to="/dashboard">
                        <DropdownItem icon={HiViewGrid}>Dashboard</DropdownItem>
                    </Link>
                    <DropdownItem icon={HiCog}>Settings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem icon={HiLogout}>Sign out</DropdownItem>
                </Dropdown>
                {
                    isLogin != null && (
                        <Button color="red" className="ms-2" onClick={handleClickLogout}>Logout</Button>
                    )
                }
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                <NavbarLink href="/" active>
                    Home
                </NavbarLink>
                <NavbarLink href="#">About</NavbarLink>
                <NavbarLink href="#">Services</NavbarLink>
                <NavbarLink href="#">Pricing</NavbarLink>
                <NavbarLink href="#">Contact</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}
