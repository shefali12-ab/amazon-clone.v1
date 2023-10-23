export const initialState ={
    basket: [],
    user:null
};
//Selector
export const getBasketTotal =(basket)=> basket?.reduce((amount,item)=>item.price+amount,0);
const reducer =(state,action)=>{
    //console.log(action)
    switch(action.type){
     case 'ADD_TO_BASKET':  
        return {
            ...state,
            basket:[...state.basket,action.item],
        } ;
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[...state.basket,action.item],

            };
        case "REMOVE_FROM_BASKET":
            /** This code remove all the item which is wrong
              return {...state,
             basket: state.basket.filter(item=> item.id!=action.id)} */
        //firstly find index that we ant to delete, then go through all of the basket item and find does any item match the action id and return it
        const index = state.basket.findIndex(
            (basketItem)=> basketItem.id === action.id
        );
        // copy the basket in temporary varible ehatever is the state
        let newBasket =[...state.basket];
        if(index>=0){
            //means it actually finds the item inside the basket
           newBasket.splice(index,1);
        }
        else{
            console.warn(`Can't remove product (id : ${action.id}) as its not in basket`)
        }
        return {
            ...state,
            basket:newBasket
        }
        case "SET_USER":
            return{
                ...state,
                user: action.user
            }

             default:
            return state;
    }
   


}
export default reducer;