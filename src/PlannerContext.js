import React from 'react'

const PlannerContext = React.createContext({
    data: {},
    addMeal: () => { },
    editMeal: () => { },
    deleteMeal: () => { },
    formatDate: () => { }
})
export default PlannerContext;