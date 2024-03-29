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
    {
        name:'Editpost',
        path:'/Editpost',
        acive:authStatus,
    },
    ]
  return (
    <>
    <header>
        <Container>
        <nav>
            <div>
                BLOG
            </div>
            <ul>
                {
                    navITem.map((item)=> item.acive?
                        <li key={item.name}><button onClick={()=> navigate(item.path)} >{item.name}</button></li> : null
                    )
                }

                 {
                    authStatus && <Lougout />
                } 
            </ul>
        </nav>
        </Container>
    </header>
    </>
  )
}

export default Header