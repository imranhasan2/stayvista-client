import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../components/api/utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";


const AddRoom = () => {

    const { user } = useAuth()

    const axiosSecure =useAxiosSecure()

    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState()

    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: null,
            key: "selection"

        }
    )

    const {mutateAsync  } =useMutation({

        mutationFn :async (roomData) =>{
            const {data} =await axiosSecure.post('/room',roomData)
            return data
           
        },
        onSuccess: () =>{
        toast.success('data saved to database')
        }
    })




    const handleDates = item => {
        console.log(item)
        setDates(item.selection)
    }


    const handleSubmit = async e => {
        e.preventDefault()

        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = ''
        const from = ''
        const price = form.price.value
        const guests = form.total_guest.value
        const bathrooms = form.bathrooms.value
        const description = form.description.value
        const bedrooms = form.bedrooms.value
        const image = form.image.files[0]

        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email

        }

        try {
            const imageURl = await imageUpload(image)

            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                guests,
                bathrooms,
                description,
                bedrooms,
                image: imageURl,
                host
            }

            // post room data
           await mutateAsync(roomData)

        } catch (err) {
            console.log(err)
        }

    }

    const handleText = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }


    return (
        <div>
            <AddRoomForm dates={dates} handleDates={handleDates} handleSubmit={handleSubmit} imagePreview={imagePreview} setImagePreview={setImagePreview} handleText={handleText} imageText={imageText}></AddRoomForm>
        </div>
    );
};

export default AddRoom;