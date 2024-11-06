import ProfileEdit from "./ProfileEdit";
import NewPlace from "./NewPlace";
import PopupDeleteConfirmation from "./PopupDeleteConfirmation";
import ProfileImgEdit from "./ProfileImgEdit";

function PopupWithForm(){
    return (
        <>
        <ProfileEdit/>
        <NewPlace/>
        <PopupDeleteConfirmation/>
        <ProfileImgEdit/>
        </>
    )
}

export default PopupWithForm;