import React, { useContext, createContext, useState, useEffect } from 'react';
import { firestore, fire } from '../firebase';
import { useAuth } from '../Auth';
import { localDb } from '../defaults';
import { useHistory } from "react-router-dom";

const DbContext = createContext()

export function useDb() {
  return useContext(DbContext);
}

const DbProvider = ({children}) => {
	const history = useHistory();
	const { user } = useAuth();
	const [info, setInfo] = useState(null);
	const [error, setError] = useState();
	const [goals, setGoals] = useState();
	const [currentGoal, setCurrent] = useState(null);
	const [exercise, setExercises] = useState(null);

	useEffect(() => {
		if (user) {
	    let infoRef = firestore.collection("users").doc(user.uid);
	    infoRef.get()
	    .then((doc) => {
		    if (doc.exists) {
		    	setInfo({
						height: doc.data().height,
						weight: doc.data().weight,
						age: doc.data().age,
						firstName: doc.data().firstName,
						lastName: doc.data().lastName,
		    	});
		    	setGoals(doc.data().goals);
		    	setExercises(doc.data().exercise);
		    }
	    })
		}
		else {
			setInfo(null);
			setGoals(null);
			setExercises(null);
		}
	}, [user])

	const setExercise = async (ex, time) => {
		try {
      await firestore.collection("users").doc(user.uid).update({
        exercise: fire.FieldValue.arrayUnion({
        	exerciseId: ex,
        	time: time,
        	createdAt: new Date().toISOString()
        })
      });
			history.push("/")
      localDb('reset');
      setExercises([...exercise, {exerciseId: ex, time: time, createdAt: new Date().toISOString()}]);
		}	
		catch (err) {
			setError(err.message);
		}
	};

	const setGoal = async ({duration, target, type}) => {
		console.log(duration, target, type)
		try {
      await firestore.collection("users").doc(user.uid).update({
        goals: fire.FieldValue.arrayUnion({
        	duration: duration,
        	target: target,
        	type: type,
        	createdAt: new Date().toISOString()
        })
      });
      setGoals([...goals, {duration, target, type, createdAt: new Date().toISOString()}]);
		}
		catch (err) {
			console.log(err)
			setError(err.message);
		}
	}

	const updateGoal = (n) => {
		setCurrent(goals[n])
	}

	const updateProfile = async (height, weight, age) => {
		try {
      await firestore.collection("users")
      .doc(user.uid).update({
				height: height,
				weight: weight,
				age: age,
      });
		}	
		catch (err) {
			console.log(err)
			setError(err.message);
		}
	};

	const updateInfo = (height, weight, age) => {
		setInfo({
			height: height,
			weight: weight,
			age: age,
		})
	}

  return (
    <DbContext.Provider value={{
      user,
      info,
      goals,
      error,
      exercise,
      setExercise,
      setGoal,
      updateGoal,
      currentGoal,
			updateProfile,
			updateInfo
    }}>
      {children}
    </DbContext.Provider>
  )
}

export { DbProvider,  DbContext }