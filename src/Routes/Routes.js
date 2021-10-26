import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Create from '../Components/Create/Create'
import Home from '../Components/Home/Home'
import { Landing } from '../Components/Landing/Landing'
import PostView from '../Components/Post/PostView'

export default(
<Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/login' component={Landing}/>
    <Route  path='/create' component={Create}/>
    <Route path='/posts/:post_id' component={PostView}/>
</Switch>
)