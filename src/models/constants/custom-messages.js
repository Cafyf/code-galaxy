export const MESSAGES = Object.freeze({
    ambiguity:{ 
        title:"Ambiguity",
        type:'warning',
        msg:[
        "IF_ADD_MULTIPLE_METHODS",
        "DONT_CHANGE_THE_DEFAULT_METHOD_DECLARATION",
        ]
    },
    traceError:{
        title:"PRINT_STATEMENTS_ARE_NOT_ALLOWED",
        type:"error",
        msg:["IF YOU WANT TO USE ENABLE TRACE MODE"]
    },
    declarationMissing:{
        title:"Method Declaration Missing",
        type:"error",
        msg:["PLEASE ADD PROPER SYNTAX OR KEEP THE DEFAULT DECLARATION"]
    },
    dataTypeModified:{
        title:" Data Type Declaration Modified",
        type:"warning",
        msg:["DO NOT CHANGE THE PARAMENT DATA TYPE DECLARATION KEEP THE DEFAULT ONE"]
    }
});