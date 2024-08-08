import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../components/api/utils";


const AddRoom = () => {

const {user}=useAuth()

    const [dates,setDates]=useState(
        {
            startDate:new Date(),
            endDate:null,
            key:"selection"

        }
    )

const handleDates =item =>{
    console.log(item)
    setDates(item.selection)
}


const handleSubmit =async e =>{
    e.preventDefault()

    const form =e.target;
    const location =form.location.value;
    const category=form.category.value;
    const title =form.title.value;
    const to =''
    const from =''
    const price=form.price.value
    const guests =form.total_guest.value
    const bathrooms =form.bathrooms.value
    const description =form.description.value
    const bedrooms=form.bedrooms.value
    const image=form.image.files[0]

    const host ={
        name:user?.displayName,
        image:user?.photoURL,
        email:user?.email

    }

    const imageURl=await imageUpload(image)
    console.log(imageURl)



}



    return (
        <div>
           <AddRoomForm dates={dates} handleDates={handleDates} handleSubmit={handleSubmit}></AddRoomForm>
        </div>
    );
};

export default AddRoom;