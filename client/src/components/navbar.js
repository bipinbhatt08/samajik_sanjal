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
  } from "@heroui/react";
  import {CiSearch} from 'react-icons/ci'
  import { IoNotifications } from "react-icons/io5";


 
  export default function App( {user,profile}) {
 
const {userDetails} = user  
    return (
       <Navbar isBordered >
          <NavbarContent justify="start">
            <NavbarBrand className="mr-5">
              <img src="/logo.png" className="rounded-full" alt="" width={55}  />
              {/* <div className="flex flex-col  justify-center ">
              <p className=" sm:block font-bold text-lg text-blue-500 -mb-2 ">SA<span className="text-black">MAJ<span className="text-blue-500">IK</span></span></p>
              <p className=" sm:block font-bold text-lg  ">SA<span className="text-blue-500">NJAL</span></p>
              </div> */}
            </NavbarBrand>
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
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="flex justify-between items-center gap-1">
                <p className="capitalize">{profile?.fullname}</p>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={profile.fullname}
                  size="sm"
                  src={`${process.env.NEXT_PUBLIC_API_URI}/uploads/${profile?.profilePic}`}
                />
                </div>
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
  