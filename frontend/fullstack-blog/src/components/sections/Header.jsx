import {Container} from "../index.js"
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import Lougout from "./Lougout.jsx"

function Header() {
    const authStatus = useSelector((status)=>status.auth.status)
    const navigate = useNavigate()
    const navITem = [
    {
        name:'Home',
        path:'/',
        acive:true,
    },
    {
        name:'Login',
        path:'/Login',
        acive:!authStatus,
    },
    {
        name:'Signup',
        path:'/Signup',
        acive:!authStatus,
    },
    {
        name:'Allposts',
        path:'/Allposts',
        acive:authStatus,
    },
    {
        name:'Addpost',
        path:'/Addpost',
        acive:authStatus,
    },
    ]
  return (
    <>
    <header className='py-3 shadow bg-gray-500'>
        <Container>
        <nav className='flex'>
            <div className='mr-4'>
                BLOG
            </div>
            <ul className='flex ml-auto'>
                {
                    navITem.map((item)=> item.acive?
                        <li key={item.name}><button onClick={()=> navigate(item.path)}  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'  >{item.name}</button></li> : null
                    )
                }

                 {
                    authStatus && 
                    <li>
                    <Lougout />
                    </li>
                } 
            </ul>
        </nav>
        </Container>
    </header>
    </>
  )
}

export default Header