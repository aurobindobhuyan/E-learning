const createdMessage = { success: "Successfully! created data" }
const updatedMessage = { info: "Successfully! Updated data" }
const deletedMesage = { error: "Successfully! deleted data" }


export const successfullyCreatedSnackbar = () => {
     return {
          type: "SUCCESS_MESSAGE",
          payload: createdMessage
     }
}

export const successfullyUpdatedSnackbar = () => {
     return {
          type: "UPDATED_MESSAGE",
          payload: updatedMessage
     }
}

export const successfullyDeletedSnackbar = () => {
     return {
          type: "DELETED_MESSAGE",
          payload: deletedMesage
     }
}

export const makingsnackbarClose = () => {
     return {
          type: "SNACKBAR_CLOSE"
     }
}