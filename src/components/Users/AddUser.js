import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import classes from "./AddUser.module.css";


const AddUser = (props) => {

    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const userNameChangeHandler = event => {
        setEnteredUserName(event.target.value);
    };

    const ageChangeHandler = event => {
        setEnteredAge(event.target.value);
    };

    const addUserHandler = (event) => {
        event.preventDefault();

        if(enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: "Invalid Input",
                message: "Please enter a valid name and age (Don't leave anything empty)"
            });
            return;
        }
        if(+enteredAge < 1){
            setError({
                title: "Invalid Age",
                message: "Please enter a valid age (Greater than 0)"
            });
            return;
        }

        props.onAddUser(enteredUserName, enteredAge);
        setEnteredUserName("");
        setEnteredAge("");
    }

    const errorHandler = () => {
        setError(null);
    }

    return(
        <div>
            {error && <ErrorModal onConfirm={errorHandler} title={error.title} message={error.message} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input value={enteredUserName} id="username" type="text" onChange={userNameChangeHandler}/>
                    <label htmlFor="age">Age (Years)</label>
                    <input value={enteredAge} id="age" type="number" onChange={ageChangeHandler}/>
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </div>
    )
};

export default AddUser;