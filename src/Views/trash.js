import React,{useState} from 'react'
import {useStore} from '../Components/store'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import {Card, Container ,Row,Col, CardBody,Input, CardHeader, Button} from 'reactstrap'
import {Link} from 'react-router-dom';
import axios from 'axios'

function Trash(props){
  
    var ptrash = useStore(state => state.ptrash)
    var ctrash = useStore(state => state.ctrash)

    const deletecard = async(id) => {
        const res= await axios.delete('https://healthgraphapi.herokuapp.com/api/v1/posts/delete?postId='+id)
      }
    
      const deletecomment = async(id) => { 
        const res= await axios.delete('https://healthgraphapi.herokuapp.com/api/v1/comments/delete?commentId='+id)
      }
    
      const restorecomment = async(id) => {
        const res= await axios.put('https://healthgraphapi.herokuapp.com/api/v1/comments/restore?commentId='+id)
      }
    
      const restorecard =async (id) => {
        const res= await axios.put('https://healthgraphapi.herokuapp.com/api/v1/posts/restore?postId='+id)
      }
    
    return(
        <div>
        <Container style={{paddingTop:"20px"}}>
          <Row>
              <Col sm={9}>
                    <h1 style={{textAlign:"center"}}>Trash</h1>
              </Col>
              <Col md={3}>
                <Button><Link style={{textDecoration:"none",color:"white"}} to="/">News Feeds</Link></Button>
              </Col>
          </Row>
          <Row  style={{paddingTop:"20px"}}>   
            <Col>
                {(ptrash.map((info,id)=>
                <div key={id}>
                <Card> 
                    <CardHeader> 
                        <Row>  
                        <Col xs={10} md={11}><b>{info.author}</b></Col> 
                        <Col xs={1} md={1}><i className="fa fa-ellipsis-v  " data-toggle="dropdown"></i>
                          <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={()=>restorecard(info.id)}>Restore</div>
                            <div className="dropdown-item" onClick={()=>{deletecard(info.id)}}>Delete</div>
                          </div>
                        </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>{info.content}</CardBody>
                </Card>
                </div> 
                ))}
            </Col>
          </Row>
          <Row>   
            <Col>
            {(ctrash.map((info,index)=>
                <div key={index} style={{paddingBottom:"10px"}}>
                <Card> 
                    <CardHeader> 
                        <Row>  
                        <Col xs={10} md={11}><b>{info.author}</b></Col> 
                        </Row>
                    </CardHeader>
                            <Row>
                                <Col className="offset-md-1" xs={10} md={9}>{info.desc}</Col>
                                <Col xs={1} md={1}><i className="fa fa-ellipsis-v" data-toggle="dropdown"></i>
                                    <div className="dropdown-menu">
                                      <div className="dropdown-item" onClick={()=>restorecomment(info.id)}>Restore</div>
                                      <div className="dropdown-item" onClick={()=>deletecomment(info.id)}>Delete</div>
                                    </div>
                                  </Col>
                            </Row>
                        </Card>
                        </div> 
                        ))}
                    
                    </Col>
                </Row>
                </Container>
            </div>
            
            )
        }

export default Trash;