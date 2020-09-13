import React ,{Component} from 'react'
import Home from './home'

class App extends Component{
    constructor(){
        super();
        this.state={
            res:[],
            ptrash:[],
            ctrash:[],
            reload:false
        }
    }

    async componentDidMount(){
        var output = await (await fetch('https://healthgraphapi.herokuapp.com/api/v1/posts')).json();
        var data = output.posts;
        var postTrash = await (await fetch('https://healthgraphapi.herokuapp.com/api/v1/posts/trash')).json();
        var ptrash = postTrash.posts;
        var commentTrash = await (await fetch('https://healthgraphapi.herokuapp.com/api/v1/comments/trash')).json();
        var ctrash = commentTrash.comments;
        this.setState({ res: data ,ptrash:ptrash,ctrash:ctrash,reload:true})
        
    }
    
    render(){
        return(
            <div>
                {this.state.reload?<Home data={this.state.res} ptrash={this.state.ptrash} ctrash={this.state.ctrash}/>:<div>Loading please wait..</div>}
               
            </div>
            
        )
    }
}

export default App;
