import React from 'react'
import {Link, BrowserRouter,Route} from 'react-router-dom'
import App from './App';
import ComponentsTest from './components-test'
import {SeasonsComponent} from './seasons'
import {AppSeachBar} from "./AppSearchBar";
import {AppVideoComponent} from "./appVideoComponent";
import {AppSongs} from "./AppSongs";
import {AppBlogPosts} from "./AppBlogPosts";
import AppTwitchTV from "./AppTwitchTV";
import AppContextTest from "./app_context_test";
import HooksApp from "./App_Hooks";
// import {} from 'semanti-ui-react'
// https://stackoverflow.com/questions/51036731/menu-item-active-state-not-working-with-navlink-semantic-ui-react

class HomeRouteMenu extends React.Component {
    state={name:'0'}
    activeMarker=(name)=>{
        this.setState({name:name})
        console.log("current menu value",name," compare: ",this.state.name)
    }

    navigationBar = () => {
        return (
            <div className="ui secondary pointing menu">
                <Link to="/"><p onClick={()=>this.activeMarker('0')} className={`item ${this.state.name==='0'?'active':''}`}>Home</p></Link>
                <Link to="/ComponentsTest"><p onClick={()=>this.activeMarker('1')} className= {`item ${this.state.name==='1'?'active':''}`}>Test</p></Link>
                <Link to="/SeasonsComponent"><p onClick={()=>this.activeMarker('2')} className= {`item ${this.state.name==='2'?'active':''}`}>Seasons</p></Link>
                <Link to="/AppSeachBar"><p onClick={()=>this.activeMarker('3')} className= {`item ${this.state.name==='3'?'active':''}`}>Search Bar</p></Link>
                <Link to="/AppVideoComponent"><p onClick={()=>this.activeMarker('4')} className= {`item ${this.state.name==='4'?'active':''}`}>Video App</p></Link>
                <Link to="/AppSongs"><p onClick={()=>this.activeMarker('5')} className= {`item ${this.state.name==='5'?'active':''}`}>Songs App</p></Link>
                <Link to="/AppBlogPosts"><p onClick={()=>this.activeMarker('6')} className= {`item ${this.state.name==='6'?'active':''}`}>Blogs</p></Link>
                <Link to="/AppTwitchTV"><p onClick={()=>this.activeMarker('7')} className= {`item ${this.state.name==='7'?'active':''}`}>Streaming</p></Link>
                <Link to="/AppContextTest"><p onClick={()=>this.activeMarker('8')} className= {`item ${this.state.name==='8'?'active':''}`}>Contexts</p></Link>
                <Link to="/HooksApp"><p onClick={()=>this.activeMarker('9')} className= {`item ${this.state.name==='9'?'active':''}`}>Hooks & Reusable functions</p></Link>
            </div>
        )
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        {this.navigationBar()}
                        <Route exact path="/" component={App}></Route>
                        <Route exact path="/ComponentsTest" component={ComponentsTest}></Route>
                        <Route exact path="/AppSeachBar" component={AppSeachBar}></Route>
                        <Route exact path="/AppVideoComponent" component={AppVideoComponent}></Route>
                        <Route exact path="/AppSongs" component={AppSongs}></Route>
                        <Route exact path="/AppBlogPosts" component={AppBlogPosts}></Route>
                        <Route exact path="/AppTwitchTV" component={AppTwitchTV}></Route>
                        <Route exact path="/AppContextTest" component={AppContextTest}></Route>
                        <Route exact path="/HooksApp" component={HooksApp}></Route>
                        <Route exact path="/SeasonsComponent" component={SeasonsComponent}></Route>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default HomeRouteMenu
