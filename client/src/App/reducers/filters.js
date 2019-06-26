
import { SET_VISIBILITY_FILTER, visibilityFilters } from '../constants'


const filters = (state = visibilityFilters.all, action) => {
  switch(action.type){
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
export default filters