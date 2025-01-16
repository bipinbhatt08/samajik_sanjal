'use client'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
  } from "@nextui-org/react";
  import {CiSearch} from 'react-icons/ci'
  import { IoNotifications } from "react-icons/io5";


 
  export default function App( {user,profile}) {
 
const {userDetails} = user  
    return (
     <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-5">
            <img src="/logo.png" className="rounded-full" alt="" width={55}  />
            <p className="hidden sm:block font-bold text-xl ml-2">{profile.fullname}</p>
          </NavbarBrand>
          
          <NavbarContent className="hidden sm:flex gap-4">
            <NavbarItem>
              <Link color="foreground" href="#">
                Friends
              </Link>
            </NavbarItem>
            <NavbarItem >
              <Link color="foreground"  href="#">
                Add 
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                hello
              </Link>
            </NavbarItem>
            
          </NavbarContent>
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="end">
        <NavbarItem>
              <Link color="foreground" href="#" className="flex flex-wrap items-center">
                <IoNotifications size={20}/>
              </Link>
            </NavbarItem>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search user"
            size="sm"
            startContent={<CiSearch />
            }
            type="search"
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={profile.fullname}
                size="sm"
                src={`${process.env.NEXT_PUBLIC_API_URI}/uploads/${profile?.profilePic}`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userDetails?.email}</p>
              </DropdownItem>
              <DropdownItem key="myProfile" as={Link} href="/profile" className="text-black">My Profile</DropdownItem>
              <DropdownItem key="setUpProfile"  className="text-black">Edit Profile</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    );
  }
  