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
    Button,
  } from "@heroui/react";
  import {CiSearch} from 'react-icons/ci'
  import { IoNotifications,IoHome,IoPeople,IoChatboxEllipses,IoAddCircle, IoBook, IoCreate  } from "react-icons/io5"

 
  export default function App( {user,profile}) {
 console.log("PO",profile)
const {userDetails} = user  
    return (<>
      <Navbar isBordered shouldHideOnScroll maxWidth="full" >
        <NavbarContent justify="start"   >
          <NavbarBrand className="">
            <div className="logoContainer w-[40px]  md:w-[50px]">
            <img src="/logo.png" className="rounded-full w-full" alt="Samajik Sanjal Logo"    />
            </div>
            <div className=" flex-col justify-center hidden md:block">
              <p className="font-bold text-md text-blue-500 -mb-2 ">SA<span className="text-black">MAJ<span className="text-blue-500">IK</span></span></p>
              <p className=" font-bold text-md  ">SA<span className="text-blue-500">NJAL</span></p>
            </div>
          </NavbarBrand>
         
        </NavbarContent>
      
      
        <NavbarContent justify="center" className=" -mr-5">
           <NavbarItem>
          <div className="searchButtonContainer relative  border-r-1 pr-4 ">
                <Input type="text" placeholder="Type here ..." size="md" radius="sm" />
                <div className="absolute top-0 right-5 flex items-center justify-center h-full ">
                  <Button type="submit"  radius="none " size="sm" color="primary">Search</Button>
                </div>
            </div>
          </NavbarItem>
          <NavbarItem className="md:block">
            <p>NEWSFEED</p>
          </NavbarItem>
            <NavbarItem>
              <Link href="/login" className="text-md text-gray-800 hover:text-blue-500 hover:bg-gray-100 rounded-full p-1 border-hidden ">
              <IoHome className="text-xl"/>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/login" className="text-md text-gray-800  hover:text-blue-500 hover:bg-gray-100 rounded-full p-1 border-hidden">
              <IoPeople className="text-xl"/>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/login" className="text-md text-gray-800  hover:text-blue-500 hover:bg-gray-100 rounded-full p-1 border-hidden">
              <IoChatboxEllipses className="text-xl"/>
              </Link>
            </NavbarItem>
            <NavbarItem  >
              <Link href="/login" className="text-gray-800  hover:text-blue-500 hover:bg-gray-100 rounded-full p-1 border-hidden" >
              <IoNotifications className="text-xl"/>
              </Link>
            </NavbarItem>
            
            
            
        </NavbarContent>

        <NavbarContent justify="end" className="">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
              <Button radius="sm" className="bg-white font-semibold" ><IoAddCircle className="text-lg"/>Create</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" >
                <DropdownItem key="story" as={Link} href="/addStory"className="text-gray-800" startContent={<IoBook className="text-2xl "/>}
                
                description="Expires in 24 Hr."

                >Story</DropdownItem>
                <DropdownItem key="post"  as={Link} href="/addPost" className="text-gray-800" startContent={<IoCreate className="text-2xl"/>}
                description="Does not expire."

>Post</DropdownItem>
                
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem  >
            <p className="capitalize font-bold text-blue-500">{profile?.fullname?.split(" ")[0]}</p>
          </NavbarItem>
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
                 alt={`${profile?.fullname}'s Avatar`}
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
</>
      //  <Navbar isBordered >
      //     <NavbarContent justify="start">
      //       <NavbarBrand className="mr-5">
      //         <img src="/logo.png" className="rounded-full" alt="" width={55}  />
      //         {/* <div className="flex flex-col  justify-center ">
      //         <p className=" sm:block font-bold text-lg text-blue-500 -mb-2 ">SA<span className="text-black">MAJ<span className="text-blue-500">IK</span></span></p>
      //         <p className=" sm:block font-bold text-lg  ">SA<span className="text-blue-500">NJAL</span></p>
      //         </div> */}
      //       </NavbarBrand>
      //       <Input
      //         classNames={{
      //           base: "max-w-full sm:max-w-[10rem] h-10",
      //           mainWrapper: "h-full",
      //           input: "text-small",
      //           inputWrapper:
      //             "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      //         }}
      //         placeholder="Search user"
      //         size="sm"
      //         startContent={<CiSearch />
      //         }
      //         type="search"
      //       />
      //       <NavbarContent className="hidden sm:flex gap-4">
      //         <NavbarItem>
      //           <Link color="foreground" href="#">
      //             Friends
      //           </Link>
      //         </NavbarItem>
      //         <NavbarItem >
      //           <Link color="foreground"  href="#">
      //             Add 
      //           </Link>
      //         </NavbarItem>
      //         <NavbarItem>
      //           <Link color="foreground" href="#">
      //             hello
      //           </Link>
      //         </NavbarItem>
      //       </NavbarContent>
      //     </NavbarContent>
      //     <NavbarContent as="div" className="items-center" justify="end">
      //     <NavbarItem>
      //           <Link color="foreground" href="#" className="flex flex-wrap items-center">
      //             <IoNotifications size={20}/>
      //           </Link>
      //         </NavbarItem>
      //       <Dropdown placement="bottom-end">
      //         <DropdownTrigger>
      //           <div className="flex justify-between items-center gap-1">
      //           <p className="capitalize">{profile?.fullname}</p>
      //           <Avatar
      //             isBordered
      //             as="button"
      //             className="transition-transform"
      //             color="secondary"
      //             name={profile.fullname}
      //             size="sm"
      //             src={`${process.env.NEXT_PUBLIC_API_URI}/uploads/${profile?.profilePic}`}
      //           />
      //           </div>
      //         </DropdownTrigger>
      //         <DropdownMenu aria-label="Profile Actions" variant="flat">
      //           <DropdownItem key="profile" className="h-14 gap-2">
      //             <p className="font-semibold">Signed in as</p>
      //             <p className="font-semibold">{userDetails?.email}</p>
      //           </DropdownItem>
      //           <DropdownItem key="myProfile" as={Link} href="/profile" className="text-black">My Profile</DropdownItem>
      //           <DropdownItem key="setUpProfile"  className="text-black">Edit Profile</DropdownItem>
      //           <DropdownItem key="logout" color="danger">
      //             Log Out
      //           </DropdownItem>
      //         </DropdownMenu>
      //       </Dropdown>
      //     </NavbarContent>
      //   </Navbar>
);
  }
  