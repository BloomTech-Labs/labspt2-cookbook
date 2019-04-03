import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import IndividualRecipe from "./IndividualRecipe"
import axios from 'axios';
import { bindActionCreators } from 'redux';
import  {getUser} from '../actions/UserActions';
import {addRecipe, addRecipeSuccess, getSelectedRecipe, getRecipes} from '../actions/RecipeActions';
import NavBar from "./NavBar";

import { Button ,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, Form, FormGroup, Label, Input, legend, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import '../css/RecipeList.css';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';


class RecipeList extends Component{


    constructor(props) {
        super(props)
        
        this.state = {
            modal: false,
            modal2: false,
            recipes: []
           
        }
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
       
     
    }


    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         recipes: []
    //     } 
    // }
   
    componentDidMount() {
        let id = 1
        let addedRecipe = {
            recipe_id: 1
        }
        
        this.props.getRecipes(id)
}

   
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
       
        }));
      }
      
    toggle2(item) {
        console.log(item)
            this.setState({
                modal2: !this.state.modal2,
                selectedItem: item
            });
            
    }
      

     

    render(){
        return (
             <div className="recipeListPage">
             <NavBar />

            <div className="recipeList-container">
                 <div className="calendar-topBar" >
                    <div className="newRecipeLink"><Link className="create-tag-p" to="/create">Add Recipe</Link></div>
                     <div className="search-bar">Search<input className="search-bar" /></div>
                     <Button color="danger" onClick={this.toggle}>Filter</Button>
                     <Modal style={{maxWidth: '400px'}}  isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
                         <ModalHeader>Filter by type of Meal</ModalHeader>
                        <Form style={{padding:'10px'}} >
                            <FormGroup >
                               <FormGroup  style={{ display: 'flex', flexDirection: 'row'}} >
                               <div  style={{width: '20px', height: '20px', paddingTop: '10px', paddingLeft: '10px'}} >
                                   <Input style={{margin: 'auto'}} type="checkbox" />{"   "}
                                   </div>
                                    <Label check style={{padding: '5px'}} >Breakfast</Label>    
                               </FormGroup>
                               <FormGroup  style={{ display: 'flex', flexDirection: 'row'}} >
                               <div  style={{width: '20px', height: '20px', paddingTop: '10px', paddingLeft: '10px'}} >
                                   <Input style={{margin: 'auto'}} type="checkbox" />{"   "}
                                   </div>
                                    <Label check style={{'padding': '5px'}} >Lunch</Label>
                               </FormGroup>
                               <FormGroup  style={{ display: 'flex', flexDirection: 'row'}} >
                               <div  style={{width: '20px', height: '20px', paddingTop: '10px', paddingLeft: '10px'}} >
                                   <Input style={{margin: 'auto'}} type="checkbox" />{"   "}
                                   </div>
                                    <Label check style={{padding: '5px'}} >Dinner</Label>
                               </FormGroup>
                               
                            </FormGroup>
                            <Button >Submit</Button>
                        </Form>
                     </Modal>
                 </div>
                 
                 <div className="recipeContent">



                {this.props.recipes.map((item) => (
                    <Card key={item.name} style={{margin: '10px'}}>
                    <Link   to={`/recipes/${item.recipe_id}`} >
                        
                        <div style={{padding: '10px', height: '250px', width: '200px'}}>
                            <CardTitle>{item.name}</CardTitle>
                            <CardText>text some card text</CardText>
                           
                        </div>
                        
                        
                    
                    </Link>
                    <Button onClick={() => this.toggle2(item)} >Edit</Button>
                    
                    
                    <div className="deleteButton">Delete</div>
                    </Card>
                )   )}
                   {this.state.selectedItem && <Modal style={{maxWidth: '400px'}}  isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className} >
                         <ModalHeader>Edit {this.state.selectedItem.name}</ModalHeader>
                        <Form style={{padding:'10px'}} >
                            <FormGroup>
                               <FormText>Please enter a new date in format MMDDYYYY with no spaces or slashes and select one new meal type then hit save</FormText>
                               <Input type="datetime" name="datetime" placeholder="MMDDYYYY" />
                               <FormGroup  style={{ display: 'flex', flexDirection: 'row'}} >
                               <div  style={{width: '20px', height: '20px', paddingTop: '10px', paddingLeft: '10px'}} >
                                   <Input style={{margin: 'auto'}} type="checkbox" />{"   "}
                                   </div>
                                    <Label check style={{'padding': '5px'}} >Breakfast</Label>    
                               </FormGroup>
                               <FormGroup  style={{ display: 'flex', flexDirection: 'row'}} >
                               <div  style={{width: '20px', height: '20px', paddingTop: '10px', paddingLeft: '10px'}} >
                                   <Input style={{margin: 'auto'}} type="checkbox" />{"   "}
                                   </div>
                                    <Label check style={{padding: '5px'}} >Lunch</Label>
                               </FormGroup>
                               <FormGroup  style={{ display: 'flex', flexDirection: 'row'}} >
                               <div  style={{width: '20px', height: '20px', paddingTop: '10px', paddingLeft: '10px'}} >
                                   <Input style={{margin: 'auto'}} type="checkbox" />{"   "}
                                   </div>
                                    <Label check style={{padding: '5px'}} >Dinner</Label>
                               </FormGroup>
                               
                            </FormGroup>
                            <Button >Save Edit</Button>
                        </Form>
                     </Modal>}
                </div>
            </div>   
        </div>          
        )
    }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({getRecipes, getUser, addRecipe, addRecipeSuccess, getSelectedRecipe}, dispatch)

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.UserReducer.user,
        recipes: state.RecipeReducer.recipes
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)


