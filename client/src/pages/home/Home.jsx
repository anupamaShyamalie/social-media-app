import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import './home.css'

const Home = () => {
  return (
    <>
     <Topbar/>
     <div className='home'>
       
        <Sidebar/>
        <Feed/>
        <Rightbar/>
    </div>
    </>
    
  )
}

export default Home