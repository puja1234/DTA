
import { ActivityActions } from './../../constants/actions';
import _ from 'lodash';

// Represents an activity object and its current state.
const initialState = {
    activities: [],                // activities Array from Apis.
    error: {}                  // error from Apis.
};

const ActivityReducer = (state = initialState, action) => {
    let duplicateState = _.cloneDeep(state);
    switch (action.type) {
        case ActivityActions.GetActivity.Success:
            duplicateState.activities = action.data;
            break;
        case ActivityActions.GetActivity.Failure:
            duplicateState.error = action.error;
            break;

        case ActivityActions.GetActivity.Start:
            break;

        case ActivityActions.PostActivity.Success:
            console.log('data in action',duplicateState.activities);
             if(duplicateState && duplicateState.activities.length>0){
                 let index = duplicateState.activities.findIndex((dates)=> dates._id === action.data.date);
                 if(index>=0){
                     duplicateState.activities[index].activities.push(action.data)
                 } else{
                     duplicateState.activities.push({
                         _id:action.data.date,
                         activities : [action.data]
                     })
                 }
             } else{
                    duplicateState.activities = [{
                        _id:action.data.date,
                        activities : [action.data]
                    }]
             }
             console.log("data added in reducer is :",action.data,duplicateState);
             break;
        case ActivityActions.PostActivity.Failure:
            console.log('error in reducer');
            break;
        case ActivityActions.UpdateActivity.Success:
            console.log('action.data in reducer----',action.data,duplicateState.activities);
            if(duplicateState && duplicateState.activities.length>0){
                duplicateState.activities.map((activityLogs) => {
                    activityLogs.activities.map((activity) => {
                        console.log('activity found-----------',activity._id,action.data._id);
                        if(activity._id === action.data._id){
                            activity = action.data;
                            console.log('activity',activity);
                        }
                    })
                })
            }
            console.log('data in reducer after updation-----------',duplicateState.activities);
            break;
        case ActivityActions.UpdateActivity.Failure:
            console.log('error in reducer');
            break;

        case ActivityActions.DeleteActivity.Success:
            console.log("Deleteing activity with id :",action.data,duplicateState.activities);
            if(duplicateState && duplicateState.activities.length>0) {
                let index = duplicateState.activities.findIndex((dates) => dates._id === action.data.date);
                if (index >= 0) {
                    let index2 = duplicateState.activities[index].activities.findIndex((activity) => activity._id === action.data._id)
                    if(index2>=0)
                        duplicateState.activities[index].activities.splice(index2,1)
                    }
                }
                console.log('data after deletion',duplicateState.activities);
            break;

        case ActivityActions.DeleteActivity.Failure:
            console.log('error in reducer');
            break;

        case ActivityActions.DeleteAllActivity.Success:
            console.log('deleting all activities...***************',action.data.date,duplicateState.activities[1]._id);
            let date = parseInt(action.data.date);
            //console.log('types--------->>>>>>>',typeof(date),typeof(duplicateState.activities[1]._id));
            if(duplicateState && duplicateState.activities.length>0) {
                let index = duplicateState.activities.findIndex((dates) => dates._id === date);
                console.log('&&&&&&&&&&&&&&&&',index);
                if (index >= 0) {
                    duplicateState.activities[index].activities.splice(index, 1);
                    console.log('date deleted!!!!!!!!!!!!');
                }
            }
            console.log('data after deletion',duplicateState.activities);
            break;

        default:
            break;
    }

    return duplicateState;
};

export default ActivityReducer;
