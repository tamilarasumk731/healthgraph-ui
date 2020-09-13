import React from 'react'
import {useStore} from '../Components/store'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import {Card, Container ,Row,Col, CardBody, CardHeader,Form, Button,Label} from 'reactstrap'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useForm } from 'react-hook-form';
import axios from 'axios'


  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


  
function Feed(props){
 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  var data = useStore(state => state.data);
  const { register, handleSubmit } = useForm(); 
  const [inputValue, setInputValue] = React.useState("");
  

  const onSubmit = async (data) => {
    const res= await axios.post('https://healthgraphapi.herokuapp.com/api/v1/posts',{ 
      author:data.author,  
      content:data.content,
     })
  }

 const  addComment =async (id,author)=>{
    const res= await axios.post('https://healthgraphapi.herokuapp.com/api/v1/comments',{ 
      post_id:id,
      author:"Magesh",
      desc:inputValue
     })
  }

  
  const deletecard = async(id) => {
    const res= await axios.delete('https://healthgraphapi.herokuapp.com/api/v1/posts/delete?postId='+id)
  }

  const deletecomment = async(id) => { 
    const res= await axios.delete('https://healthgraphapi.herokuapp.com/api/v1/comments/delete?commentId='+id)
  }

  const movecomment = async(id) => {
    const res= await axios.put('https://healthgraphapi.herokuapp.com/api/v1/comments/trash?commentId='+id)
  }

  const movecard =async (id) => {
    const res= await axios.put('https://healthgraphapi.herokuapp.com/api/v1/posts/trash?postId='+id)
  }


  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

    return(
        <div>
        <Container style={{paddingTop:"20px"}}>
          <Row> 
              <Col xs={12} sm={12} md={9}>
                    <h1 style={{textAlign:"center"}}>News Feeds</h1>
              </Col>
              <Col xs={6} sm={6} md={1} style={{textAlign:"center"}}>
          <Button onClick={handleOpen}>
              <i className="fa fa-plus-circle"></i>
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
        <Fade in={open}>
            <Container style={{border:"thick solid white"}}>
                <div style={{textAlign:"center"}}>
                  <Form  onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <h1 style={{color:"white"}}>New User</h1>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom:"10px"}}>
                    <Col className="offset-md-1" md={1}>
                            <Label style={{color:"white"}} name="name">Name </Label>
                         </Col>
                        <Col md={8}>
                            <input id="author" name="author" ref={register({required:'name is required'})} placeholder="User Name"/>
                         </Col>
                    </Row>
                    <Row>
                    <Col className="offset-md-1" md={1}>
                            <Label style={{color:"white"}} name="feed">Feed </Label>
                         </Col>
                        <Col md={8}>
                            <input id="content" name="content" ref={register({required:'name is required'})} type="textarea" placeholder="Enter the Feed"/>
                         </Col>
                    </Row>
                    <Row style={{paddingTop:"10px"}}>
                        <Col className="offset-md-5" md={2}>
                            <input type="submit"></input>
                        </Col>
                    </Row>
                    </Form>
                 </div>
            </Container>
        </Fade>
      </Modal>
          </Col>
              <Col xs={6} sm={6} md={1} style={{textAlign:"center"}}>
                <Button><Link style={{textDecoration:"none",color:"white"}} to="/trash">Trash</Link></Button>
              </Col>
          </Row>
          <Row>   
            <Col>
                {(data.map((info,id)=>
                <div key={id} style={{paddingTop:"20px"}}>
                <Card> 
                    <CardHeader> 
                        <Row>  
                        <Col xs={10} md={11}><b>{info.author}</b></Col> 
                       <Col xs={1} md={1}><i className="fa fa-ellipsis-v  " data-toggle="dropdown"></i>
                          <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={()=>movecard(info.id)}>Move to trash</div>
                            <div className="dropdown-item" onClick={()=>{deletecard(info.id)}}>Delete</div>
                          </div>
                        </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>{info.content}</CardBody>
                    <hr/>
                        <Row>
                            <Col className="offset-md-1" xs={10} md={9}><input className="col-md-11" onChange={ handleInputChange } placeholder="Add a comment..."/></Col>
                            <Col xs={1} md={1}><i className="fa fa-paper-plane" onClick={(e)=>addComment(info.id,info.author)}></i></Col>
                        </Row><hr/>
                        {info.comments.map((commentries,index)=>
                        <div>
                        <Row>
                          <Col>
                              <div style={{color:"white",fontWeight:"bolder",backgroundColor:"lightgray"}}>{commentries.author}</div>
                          </Col>
                        </Row>
                            <Row key={index}>
                                <Col className="offset-md-1" xs={10} md={9}>{commentries.desc}</Col>
                                <Col xs={1} md={1}><i className="fa fa-ellipsis-v" data-toggle="dropdown"></i>
                                    <div className="dropdown-menu">
                                      <div className="dropdown-item" onClick={()=>movecomment(commentries.id)}>Move to trash</div>
                                      <div className="dropdown-item" onClick={()=>deletecomment(commentries.id)}>Delete</div>
                                    </div>
                                  </Col>
                            </Row>
                            </div>
                        )}
                </Card>
                </div> 
                ))}
            </Col>
          </Row>
        </Container>
      </div>
    
    )
}

export default Feed;
