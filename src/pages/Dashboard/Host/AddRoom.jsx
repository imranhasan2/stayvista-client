import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../components/api/utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddRoom = () => {

    const navigate =useNavigate()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)

    const axiosSecure = useAxiosSecure()

    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState()

    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"

        }
    )

    const { mutateAsync } = useMutation({

        mutationFn: async (roomData) => {
            const { data } = await axiosSecure.post('/room', roomData)
            return data

        },
        onSuccess: () => {
            toast.success('data saved to database')
            navigate('/dashboard/my-listings')
            setLoading(false)
        }
    })




    const handleDates = item => {
        console.log(item)
        setDates(item.selection)
    }


    const handleSubmit = async e => {

        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = dates.endDate
        const from = dates.startDate
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
            setLoading(false)

        } catch (err) {
            console.log(err)
            toast.err(err.message)
            setLoading(false)
        }

    }

    const handleText = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }


    return (
        <div>
            <AddRoomForm dates={dates} handleDates={handleDates} handleSubmit={handleSubmit} imagePreview={imagePreview} setImagePreview={setImagePreview} handleText={handleText} imageText={imageText} loading={loading}></AddRoomForm>
        </div>
    );
};

export default AddRoom;